import { useRef, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import backIcon from "@/assets/icons/back.svg";
import PRF_IMG from "@/assets/icons/storeInfoPage/PRF_IMG.svg";
import imageIcon from "@/assets/icons/storeInfoPage/imageIcon.svg";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import { InputEdit } from "@/components/InputEdit";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import {
  useDaumPostcodePopup,
  type Address, // 주소 타입
} from "react-daum-postcode";
import { TimeInput } from "@/components/common/TimeInput";

export const MyInfoPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null); // 선택된 이미지 URL

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [description, setDescription] = useState("");

  // 주소 상태
  const [address, setAddress] = useState("");

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
  };

  const handleOpenPostcode = () => {
    openPostcode({
      onComplete,
    });
  };

  const handleSave = () => {
    navigate(ROUTES.HOME, { state: { showToast: true } });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
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
          className="absolute right-[20px] text-[20px] text-[#3CADFF] font-semibold z-3"
          onClick={handleSave}
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
              src={profileImage || PRF_IMG}
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
          <InputEdit placeholder="가게 이름을 적어주세요." />
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
          <InputEdit placeholder="010-0000-0000" />
        </div>
        <div className="gap-4 flex flex-col mb-[70px]">
          <label className="flex flex-row justify-between subhead-02 text-[#47484B] text-[14px]">
            <p>가게 소개</p>
            <p className="text-[#8F9498]">
              <span className="text-[#3CADFF]">{description.length}</span>/500
            </p>
          </label>

          <TextareaAutosize
            placeholder={"우리 가게를 소개해봐요!"}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            className="min-h-[138px] h-auto w-full text-[16px]  rounded-[8px] border-[1px] border-[#BCC3CE] px-4 py-4 focus:border-[#3CADFF] focus:outline-none resize-none "
          />
        </div>
      </form>
    </MainLayout>
  );
};
