import { useEffect, useRef, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import backIcon from "@/assets/icons/back.svg";
import PRF_IMG from "@/assets/icons/storeInfoPage/PRF_IMG.svg";
import imageIcon from "@/assets/icons/storeInfoPage/imageIcon.svg";

import { useNavigate } from "react-router-dom";
import { InputEdit } from "@/components/InputEdit";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import {
  useDaumPostcodePopup,
  type Address, // 주소 타입
} from "react-daum-postcode";
import { TimeInput } from "@/components/common/TimeInput";
import { useQuery } from "@tanstack/react-query";
import type { Store } from "@/types/store";
import {
  presignStoreImageDraft,
  uploadToS3,
  updateStore,
  getMyStore,
} from "@/apis/store";

const PHONE_REGEX = /^(?:\d{2,3}-\d{3,4}-\d{4})$/;

export const MyInfoPage = () => {
  const { data: store } = useQuery<Store>({
    queryKey: ["myStore"],
    queryFn: getMyStore,
  });

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [storeName, setStoreName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  // 주소 상태
  const [address, setAddress] = useState("");
  const [dong, setDong] = useState("");
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);

  const [originalStore, setOriginalStore] = useState<Store | null>(null);

  const isPhoneChanged =
    originalStore && phoneNumber !== (originalStore.phoneNumber ?? "");

  useEffect(() => {
    if (!store) return;
    setStoreName(store.storeName ?? "");
    setPhoneNumber(store.phoneNumber ?? "");
    setStartTime((store.openTime ?? "").slice(0, 5));
    setEndTime((store.closeTime ?? "").slice(0, 5));
    setDescription(store?.description ?? "");
    setProfilePreview(store.storeImageUrl ?? null);

    setAddress(store.address?.roadAddress ?? "");
    setDong(store.address?.dong ?? "");
    setLatitude(store.address?.latitude);
    setLongitude(store.address?.longitude);
    setOriginalStore(store); // 기준 저장
  }, [store]);

  // 3) 최초 로딩 시 store → 폼에 주입
  useEffect(() => {
    if (!store) return;
    setStoreName(store.storeName ?? "");
    setPhoneNumber(store.phoneNumber ?? "");
    setStartTime((store.openTime ?? "").slice(0, 5));
    setEndTime((store.closeTime ?? "").slice(0, 5));
    setDescription(store?.description ?? "");
    setProfilePreview(store.storeImageUrl ?? null);

    // 주소
    setAddress(store.address?.roadAddress ?? "");
    setDong(store.address?.dong ?? "");
    setLatitude(store.address?.latitude);
    setLongitude(store.address?.longitude);
  }, [store]);

  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const openPostcode = useDaumPostcodePopup(scriptUrl);

  const onComplete = (data: Address) => {
    let full = data.address;
    const extras: string[] = [];
    if (data.addressType === "R") {
      if (data.bname) extras.push(data.bname);
      if (data.buildingName) extras.push(data.buildingName);
      if (extras.length) full += ` (${extras.join(", ")})`;
    }
    setAddress(full);
    setDong(data.bname || "");
  };

  const handleOpenPostcode = () => {
    openPostcode({
      onComplete,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setProfileFile(f);
    setProfilePreview(URL.createObjectURL(f));
  };

  // 7) 저장(수정) 로직
  const handleSave = async () => {
    try {
      // ✅ 전화번호를 수정했고 형식이 틀리면 막기
      if (isPhoneChanged && !PHONE_REGEX.test(phoneNumber)) {
        alert(
          "전화번호는 010-1234-5678 또는 02-123-4567 형식으로 입력해주세요."
        );
        return;
      }
      // 1) 이미지 변경 시: 먼저 presign(draft)→PUT
      let imageDraftKey: string | undefined;
      if (profileFile) {
        const ext = (profileFile.name.split(".").pop() || "jpg").toLowerCase();
        const draft = await presignStoreImageDraft({
          ext,
          contentType: profileFile.type || "image/jpeg",
          sizeBytes: profileFile.size,
        });
        await uploadToS3(draft.putUrl, profileFile);
        imageDraftKey = draft.draftKey; // 🔑 업데이트 바디에 포함
      }

      // 2) 가게 정보 업데이트 (이미지 변경 없으면 imageDraftKey 생략)
      await updateStore({
        storeName,
        address: {
          roadAddress: address,
          dong: dong || undefined,
          latitude,
          longitude,
        },
        openTime: startTime,
        closeTime: endTime,
        phoneNumber,
        description,
        imageDraftKey, // 옵션
      });

      navigate(ROUTES.HOME, { state: { showToast: true } });
    } catch (e) {
      console.error("❌ 저장 실패:", e);
    }
  };

  const hasChanges = () => {
    if (!originalStore) return false;

    const basicChanged =
      storeName !== (originalStore.storeName ?? "") ||
      phoneNumber !== (originalStore.phoneNumber ?? "") ||
      startTime !== (originalStore.openTime ?? "").slice(0, 5) ||
      endTime !== (originalStore.closeTime ?? "").slice(0, 5) ||
      description !== (originalStore.description ?? "") ||
      address !== (originalStore.address?.roadAddress ?? "") ||
      dong !== (originalStore.address?.dong ?? "") ||
      latitude !== originalStore.address?.latitude ||
      longitude !== originalStore.address?.longitude;

    const imageChanged = !!profileFile;

    return basicChanged || imageChanged;
  };

  return (
    <MainLayout bgcolor="white">
      <header className="w-full h-11 flex flex-row items-center justify-center py-[14px] mb-[44px]">
        <div className="flex flex-row items-center text-xl font-semibold ]">
          내 가게 정보
        </div>
        <img
          src={backIcon}
          alt="<"
          className="absolute left-[20px] top-[12px] z-3"
          onClick={() => navigate(-1)}
        />
        <div
          className={`absolute right-[20px] text-[20px] font-semibold z-3 ${
            hasChanges()
              ? "text-[#3CADFF] cursor-pointer"
              : "text-gray-300 cursor-not-allowed"
          }`}
          onClick={hasChanges() ? handleSave : undefined}
        >
          저장
        </div>
      </header>
      <div className="flex justify-center">
        <div
          className="w-[112px] h-[112px] relative mb-[32px] cursor-pointer"
          onClick={handleImageClick}
        >
          {
            <img
              src={profilePreview || PRF_IMG}
              alt="프로필 이미지"
              className="w-[112px] h-[112px] bg-[#F5F7FA] rounded-[112px]"
            />
          }
          <img
            src={imageIcon}
            alt="사진변경"
            className="w-[36px] h-[36px] p-[6px] bg-[#3CADFF] rounded-[100px] absolute bottom-[0px] right-[0px] border-[2px] border-white"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <form className="flex flex-col gap-[40px]">
        <div className="gap-4 flex flex-col">
          <label className="subhead-02 text-[#47484B] text-[14px]">이름</label>
          <InputEdit
            placeholder="가게 이름을 적어주세요."
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <div className="gap-4 flex flex-col">
          <label className="subhead-02 text-[#47484B] text-[14px]">위치</label>
          <Input
            placeholder="가게의 정확한 주소를 적어주세요."
            value={address}
            readOnly
            onClick={handleOpenPostcode}
            className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
            focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
          />
        </div>
        <div className="gap-2 flex flex-col">
          <label className="subhead-02 text-[#47484B] text-[14px]">
            운영시간
          </label>
          <span className="mb-1 text-[#8F9498] caption">
            운영시간 안에 거래가 가능해요!
          </span>
          <div className="flex flex-row gap-2 items-center align-center">
            <TimeInput
              value={startTime}
              onChange={setStartTime}
              placeholder="10:00"
              className="w-full flex-1 body-02 !h-11 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:border-blue-normal text-gray-900"
            />
            <span className="body-02 flex items-center text-gray-400">~</span>
            <TimeInput
              value={endTime}
              onChange={setEndTime}
              placeholder="19:00"
              className="w-full flex-1 body-02 !h-11 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:border-blue-normal text-gray-900"
            />
          </div>
        </div>
        <div className="gap-4 flex flex-col">
          <label className="subhead-02 text-[#47484B] text-[14px]">
            연락처
          </label>
          <InputEdit
            placeholder="010-0000-0000"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="gap-4 flex flex-col mb-[70px]">
          <label className="flex flex-row justify-between subhead-02 text-[#47484B] text-[14px]">
            <p>가게 소개</p>
            <p className="text-[#8F9498]">
              <span className="text-[#3CADFF]">{description.length}</span>/500
            </p>
          </label>

          <textarea
            placeholder={"우리 가게를 소개해봐요!"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            className="h-[138px]  w-full text-[16px]  rounded-[8px] border-[1px] border-[#BCC3CE] px-4 py-4 focus:border-[#3CADFF] focus:outline-none resize-none "
          />
        </div>
      </form>
    </MainLayout>
  );
};
