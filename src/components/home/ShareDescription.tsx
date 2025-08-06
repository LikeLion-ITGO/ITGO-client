import ChevronRight from "@/assets/icons/home/chevron-right.svg?react";
import { Button } from "../ui/button";

export const ShareDescription = () => {
  return (
    <div
      className="w-full flex flex-row px-4 py-3 justify-between items-center bg-blue-light active:bg-blue-light-active rounded-[20px]"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <span className="text-gray-900 text-base font-semibold">
        아직 재고 나눔이 없어요!
      </span>
      <Button className="flex px-3 py-2 items-center w-10 h-[26px] justify-center bg-white rounded-[48px]">
        <ChevronRight className="size-[10px]" />
      </Button>
    </div>
  );
};
