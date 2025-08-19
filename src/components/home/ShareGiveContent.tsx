import ChevronRight from "@/assets/icons/home/chevron-right.svg?react";
import { Button } from "../ui/button";
import { GiveShareStatus } from "@/constants/status";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface ShareGiveContentProps {
  give_status: GiveShareStatus;
}

export const ShareGiveContent = ({ give_status }: ShareGiveContentProps) => {
  const navigate = useNavigate();
  const renderDescriptionContent = () => {
    switch (give_status) {
      case GiveShareStatus.NO_REQUEST:
        return (
          <div
            className="w-full flex flex-row px-4 py-3 justify-between items-center bg-blue-light active:bg-blue-light-active rounded-[20px] select-none"
            style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
            onClick={() => {
              navigate(ROUTES.REGISTER_GIVE);
            }}
          >
            <span className="text-gray-900 text-base font-semibold">
              아직 재고 나눔이 없어요!
            </span>
            <Button className="flex px-3 py-2 items-center w-10 h-[26px] justify-center text-blue-normal bg-white rounded-[48px] hover:bg-white">
              <ChevronRight className="size-[10px]" />
            </Button>
          </div>
        );

      case GiveShareStatus.MATCHING_IN_PROGRESS:
        return (
          <div
            className="w-full flex flex-row px-4 py-3 justify-between items-center bg-blue-light active:bg-blue-light-active rounded-[20px] select-none"
            style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
            onClick={() => {
              navigate(generatePath(ROUTES.SHAREDETAIL, { id: String(1) }));
            }}
          >
            <span className="text-gray-900 text-base font-semibold">
              1개의 재고를 나눔 중...
            </span>
            <Button className="flex px-3 py-2 items-center w-10 h-[26px] justify-center text-blue-normal bg-white rounded-[48px] hover:bg-white">
              <ChevronRight className="size-[10px]" />
            </Button>
          </div>
        );

      case GiveShareStatus.RECEIVED_REQUEST:
        return (
          <div
            className="w-full flex flex-row px-4 py-3 justify-between items-center bg-sub active:bg-subtxt rounded-[20px] select-none"
            style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
            onClick={() => {
              navigate(ROUTES.MANAGE_RECEIVE);
            }}
          >
            <span className="text-gray-900 text-base font-semibold">
              재고를 나눔 요청을 받았어요
            </span>
            <Button className="flex px-3 py-2 items-center w-10 h-[26px] justify-center text-sm text-subtxt font-semibold bg-white rounded-[48px] hover:bg-white">
              7명
            </Button>
          </div>
        );

      case GiveShareStatus.SHARING_CONFIRMED:
        return (
          <div
            className="w-full flex flex-row px-4 py-3 justify-between items-center bg-sub active:bg-subtxt rounded-[20px] select-none"
            style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
            onClick={() => {
              navigate(generatePath(ROUTES.STORE_INFO, { storeId: String(1) }));
            }}
          >
            <span className="text-gray-900 text-base font-semibold">
              지금 재고를 받으러 오고 있어요!
            </span>
            <Button className="flex px-3 py-2 items-center w-10 h-[26px] justify-center text-sm text-subtxt font-semibold bg-white rounded-[48px] hover:bg-white">
              <ChevronRight className="size-[10px]" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };
  return <div>{renderDescriptionContent()}</div>;
};
