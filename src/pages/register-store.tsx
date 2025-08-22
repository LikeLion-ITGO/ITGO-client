import { useRef, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import backIcon from "@/assets/icons/back.svg";
import PRF_IMG from "@/assets/icons/storeInfoPage/PRF_IMG.svg";
import imageIcon from "@/assets/icons/storeInfoPage/imageIcon.svg";

import { useNavigate } from "react-router-dom";
import { InputEdit } from "@/components/InputEdit";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { useDaumPostcodePopup, type Address } from "react-daum-postcode";
import { TimeInput } from "@/components/common/TimeInput";
import {
  confirmStoreImage,
  createStore,
  presignStoreImage,
  uploadToS3,
} from "@/apis/store";
import type { CreateStoreReq } from "@/types/store";
import type {
  KakaoAddressSearchResult,
  KakaoStatus,
} from "@/types/kakao-address";

declare global {
  interface Window {
    kakao: {
      maps: {
        services: {
          Geocoder: new () => {
            addressSearch(
              keyword: string,
              callback: (
                result: KakaoAddressSearchResult,
                status: KakaoStatus
              ) => void
            ): void;
          };
          Status: {
            OK: KakaoStatus;
            ZERO_RESULT: KakaoStatus;
            ERROR: KakaoStatus;
          };
        };
      };
    };
  }
}

export {};

export const RegisterStore = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  // 폼 필드
  const [storeName, setStoreName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  // 주소 상태
  const [address, setAddress] = useState("");
  const [dong, setDong] = useState(""); // 동(법정동)
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const openPostcode = useDaumPostcodePopup(scriptUrl);

  const onComplete = async (data: Address) => {
    try {
      // 1) 도로명 주소 조립
      let full = data.address;
      const extras: string[] = [];
      if (data.addressType === "R") {
        if (data.bname) extras.push(data.bname);
        if (data.buildingName) extras.push(data.buildingName);
        if (extras.length) full += ` (${extras.join(", ")})`;
      }

      // 2) 주소/동 상태 저장
      setAddress(full);
      setDong(data.bname || "");

      // 3) Kakao Geocoder 로드 후 지오코딩
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        full,
        (result: KakaoAddressSearchResult, status: string) => {
          if (status === window.kakao.maps.services.Status.OK && result?.[0]) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);
            setLatitude(lat);
            setLongitude(lng);
          } else {
            console.error("❌ 좌표 변환 실패:", status, result);
          }
        }
      );
    } catch (err) {
      console.error("❌ onComplete 에러:", err);
    }
  };

  const handleOpenPostcode = () => {
    openPostcode({
      onComplete,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  /** 저장(등록) */
  const handleSave = async () => {
    try {
      // 1) 필수값 검증
      if (!storeName) return console.log("가게 이름을 입력해 주세요.");
      if (!address) return console.log("주소를 선택해 주세요.");
      if (!startTime || !endTime)
        return console.log("가게 운영시간을 입력해주세요.");
      if (latitude == null || longitude == null)
        return console.log(
          "좌표가 아직 없습니다. 주소 선택 후 잠시만 기다렸다가 다시 시도하세요."
        );

      // ✅ 전화번호 정규식 체크
      const phoneRegex = /^(?:\d{2,3}-\d{3,4}-\d{4})$/;
      if (!phoneRegex.test(phoneNumber)) {
        alert(
          "전화번호는 010-1234-5678 또는 02-123-4567 형식으로 입력해주세요."
        );
        return;
      }

      // 2) 가게 등록
      const payload: CreateStoreReq = {
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
      };

      const { storeId } = await createStore(payload);

      // 3) 이미지가 있으면 presign → PUT → confirm
      if (profileFile) {
        const ext = (profileFile.name.split(".").pop() || "jpg").toLowerCase();

        const { putUrl, objectKey } = await presignStoreImage(storeId, {
          ext,
          contentType: profileFile.type || "image/jpeg",
        });

        await uploadToS3(putUrl, profileFile);

        await confirmStoreImage({ storeId, objectKey });
      }

      navigate(ROUTES.HOME, { state: { showToast: true } });
    } catch (e) {
      console.error(e);
    }
  };

  const isFormValid =
    storeName.trim() &&
    address.trim() &&
    startTime.trim() &&
    endTime.trim() &&
    phoneNumber.trim() &&
    description.trim() &&
    latitude !== null &&
    longitude !== null;

  return (
    <MainLayout bgcolor="white">
      <header className="w-full h-11 flex flex-row items-center justify-center py-[14px] mb-[44px]">
        <div className="flex flex-row items-center text-xl font-semibold ]">
          내 가게 등록
        </div>
        <img
          src={backIcon}
          alt="<"
          className="absolute left-[20px] top-[12px] z-3"
          onClick={() => navigate(-1)}
        />
        <div
          className={`absolute right-[20px] text-[20px] font-semibold z-3 ${
            isFormValid
              ? "text-[#3CADFF] cursor-pointer"
              : "text-gray-300 cursor-not-allowed"
          }`}
          onClick={isFormValid ? handleSave : undefined}
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
