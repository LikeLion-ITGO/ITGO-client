import MainLayout from "@/components/layouts/MainLayout";
import backIcon from "@/assets/icons/back.svg";
import PRF_IMG from "@/assets/icons/storeInfoPage/PRF_IMG.svg";
import imageIcon from "@/assets/icons/storeInfoPage/imageIcon.svg";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import { InputEdit } from "@/components/InputEdit";
import { ROUTES } from "@/constants/routes";

export const MyInfoPage = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate(ROUTES.HOME, { state: { showToast: true } });
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
        <div className="w-[112px] h-[112px] relative mb-[32px]">
          {
            <img
              src={PRF_IMG}
              alt="프로필 이미지"
              className="w-[112px] h-[112px] bg-[#F5F7FA] rounded-[112px] object-cover "
            />
          }
          <img
            src={imageIcon}
            alt="사진변경"
            className="w-[36px] h-[36px] p-[6px] bg-[#3CADFF] rounded-[100px] absolute bottom-[0px] right-[0px] border-[2px] border-white"
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
          <InputEdit placeholder="가게의 정확한 주소를 적어주세요." />
        </div>
        <div className="gap-2 flex flex-col">
          <label className="subhead-02 text-[#47484B] text-[14px]">
            운영시간
          </label>
          <span className="mb-1 text-[#8F9498] caption">
            운영시간 안에 거래가 가능해요!
          </span>
          <div className="flex flex-row gap-2 items-center align-center">
            <InputEdit placeholder="00:00" />
            <span>~</span>
            <InputEdit placeholder="00:00" />
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
              <span className="text-[#3CADFF]">0</span>/500
            </p>
          </label>

          <TextareaAutosize
            placeholder={"우리 가게를 소개해봐요!"}
            maxLength={500}
            className="h-auto w-full text-[16px]  rounded-[8px] border-[1px] border-[#BCC3CE] px-4 py-4 focus:border-[#3CADFF] focus:outline-none resize-none "
          />
        </div>
      </form>
    </MainLayout>
  );
};
