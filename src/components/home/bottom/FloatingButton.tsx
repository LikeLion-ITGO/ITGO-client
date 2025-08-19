import plusBtn from "@/assets/icons/home/plusBtn.svg";
import { useState } from "react";
import shareIcon1 from "@/assets/icons/home/shareIcon_1.svg";
import shareIcon2 from "@/assets/icons/home/shareIcon_2.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-end ">
      {/* 기본 : + 버튼 */}
      <div
        className="w-[52px] h-[52px] bg-[#3CADFF] flex justify-center items-center rounded-[26px] mb-6 shadow-[0_2px_12px_0_rgba(60,173,255,0.4)] relative
"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={plusBtn}
          alt="+"
          className={`w-[18px] h-[18px] transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />

        {/* 클릭 : 나눔 버튼 2개*/}
        {isOpen && (
          <div className="bg-[#FFF] text-[#171818] text-[16px] font-medium leading-normal tracking-[-0.32px] z-10 absolute right-0 bottom-[44px] gap-2 flex flex-col mb-[20px]">
            <div
              className="w-[124px] flex justify-center items-center h-[44px] rounded-[8px]  shadow-[0_2px_12px_0_rgba(0,0,0,0.05)] active:bg-[#DDF0FF]"
              onClick={() => navigate(ROUTES.REGISTER_RECEIVE)}
            >
              <img src={shareIcon1} />
              나눔받기
            </div>
            <div
              className="w-[124px] flex justify-center items-center h-[44px] rounded-[8px]  shadow-[0_2px_12px_0_rgba(0,0,0,0.05)] active:bg-[#DDF0FF] "
              onClick={() => navigate(ROUTES.REGISTER_GIVE)}
            >
              <img src={shareIcon2} />
              나눔하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
