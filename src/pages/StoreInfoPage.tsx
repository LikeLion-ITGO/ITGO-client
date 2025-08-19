import MainLayout from "@/components/layouts/MainLayout";
import backIcon from "@/assets/icons/back.svg";
import shareIcon_1 from "@/assets/icons/home/shareIcon_1.svg";
import shareIcon_2 from "@/assets/icons/home/shareIcon_2.svg";
import storeInfoIcon1 from "@/assets/icons/storeInfoPage/storeInfoIcon1.svg";
import storeInfoIcon2 from "@/assets/icons/storeInfoPage/storeInfoIcon2.svg";
import storeInfoIcon3 from "@/assets/icons/storeInfoPage/storeInfoIcon3.svg";

import { useNavigate } from "react-router-dom";

import sampleImg from "@/assets/images/samplestoreimg.png";

export const StoreInfoPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <header className="w-full h-11 flex flex-row items-center justify-center py-[14px] mb-8">
        <div className="flex flex-row items-center text-xl font-semibold ]">
          가게 정보
        </div>
        <img
          src={backIcon}
          alt="<"
          className="absolute left-[20px] top-[12px] z-3"
          onClick={() => navigate(-1)}
        />
      </header>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3">
          <img
            src={sampleImg}
            alt="store"
            className="w-[112px] h-[112px] rounded-[112px]"
          />
          <h3 className="display-01">여기 꼬치네</h3>
        </div>
        <div className="rounded-[24px] h-[68px] bg-[#DDF0FF] py-[13px] px-[33px] flex align-center ">
          <div className="flex gap-3  items-center">
            <img src={shareIcon_1} alt="나눔" />
            <div className="flex align-center flex-col">
              <h4 className="text-[#171818] text-[20px] font-semibold">25</h4>
              <p className="text-[12px] w-[55px]">나눔한 횟수</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="42"
            viewBox="0 0 1 42"
            fill="none"
            className="mx-8"
          >
            <path d="M0.5 0L0.500002 42" stroke="#B5E0FF" />
          </svg>
          <div className="flex gap-3  items-center">
            <img src={shareIcon_2} alt="나눔" />
            <div className="flex align-center flex-col">
              <h4 className="text-[#171818] text-[20px] font-semibold">23</h4>
              <p className="text-[12px] w-[55px]">도움준 횟수</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-white rounded-[24px] p-5 w-full h-[165px]">
          <h4 className="subhead-02 text-[#A7ACB2]">기본 정보</h4>
          <div className="text-[#47484B] body-long-02 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src={storeInfoIcon1} alt="가게주소" />
              <span>노원구 공릉동 99로</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={storeInfoIcon2} alt="영업시간" />
              <span>10:00~ 19:00</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={storeInfoIcon3} alt="연락처" />
              <span>010-8634-0405</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-white rounded-[24px] p-5 w-full h-auto mb-[70px] min-h-[100px]">
          <h4 className=" text-[#A7ACB2] subhead-02">가게 소개</h4>
          <p className="text-[#47484B] body-long-02  whitespace-pre-line">
            {`안녕하세요! 다들 장사 잘되길 바래요~ 
            잇고에서 저희 가게 보고 오시면 
            서비스 드릴게요..! 화이팅`}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
