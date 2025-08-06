import ChevronRight from "@/assets/icons/home/chevron-right.svg?react";
import { Button } from "../ui/button";

export const ShareBanner = () => {
  return (
    <div
      className="bg-blue-normal active:bg-blue-normal-active rounded-[20px]"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="mx-5 my-3 flex flex-row justify-between">
        <span className="flex subhead-03 items-center text-white">
          재고 나눔을 부탁해요
        </span>
        <Button className="flex px-3 py-2 items-center w-10 h-[26px] justify-center bg-white rounded-[48px]">
          <ChevronRight className="size-[10px]" />
        </Button>
      </div>
      <div className="flex flex-col p-5 headline-long-02 bg-white rounded-[20px] pointer-events-none">
        <span>재고가 충분한가요?</span>
        <span>부족하다면 나눔을 요청하세요!</span>
      </div>
    </div>
  );
};
