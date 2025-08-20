import ChevronRight from "@/assets/icons/home/chevron-right.svg?react";
import { Button } from "../ui/button";
import { ReceiveShareStatus } from "@/constants/status";
import { Clock } from "lucide-react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

interface ShareReceiveContentProps {
  receive_status: ReceiveShareStatus;
}

export const ShareReceiveContent = ({
  receive_status,
}: ShareReceiveContentProps) => {
  const navigate = useNavigate();

  // 상태 → 라우트 생성 함수 (id 처리)
  const getRouteByStatus = (status: ReceiveShareStatus) => {
    switch (status) {
      case ReceiveShareStatus.NO_REQUEST:
        return ROUTES.REGISTER_RECEIVE;
      case ReceiveShareStatus.MATCHING_IN_PROGRESS:
        return ROUTES.MANAGE_GIVE;
      case ReceiveShareStatus.SHARING_CONFIRMED:
        return generatePath(ROUTES.SUCCESS);
      default:
        return ROUTES.HOME;
    }
  };

  const handleBannerClick = () => {
    const to = getRouteByStatus(receive_status);
    if (to) navigate(to);
  };

  const renderBannerHeaderContent = () => {
    switch (receive_status) {
      case ReceiveShareStatus.NO_REQUEST:
        return (
          <span className="flex subhead-03 items-center text-white">
            재고 나눔을 부탁해요
          </span>
        );
      case ReceiveShareStatus.MATCHING_IN_PROGRESS:
        return (
          <span className="flex subhead-03 items-center text-white">
            나눔을 요청 중...
          </span>
        );
      case ReceiveShareStatus.SHARING_CONFIRMED:
        return (
          <span className="flex subhead-03 items-center text-white">
            따스한 손길이 도착했어요!
          </span>
        );
      default:
        return null;
    }
  };

  const renderBannerContent = () => {
    switch (receive_status) {
      case ReceiveShareStatus.NO_REQUEST:
        return (
          <>
            <span>재고가 충분한가요?</span>
            <span>부족하다면 나눔을 요청하세요!</span>
          </>
        );
      case ReceiveShareStatus.MATCHING_IN_PROGRESS:
        return (
          <>
            <span>[물품명]을 요청했어요!</span>
            <span>조금만 기다려볼까요?</span>
          </>
        );
      case ReceiveShareStatus.SHARING_CONFIRMED:
        return (
          <>
            <span>[픽업 장소]로 가서 </span>
            <span>[물품명]을 받아보세요!</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-blue-normal active:bg-blue-normal-active rounded-[20px] select-none"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
      onClick={() => handleBannerClick()}
    >
      <div className="mx-5 my-3 flex flex-row justify-between">
        {renderBannerHeaderContent()}
        <Button className="flex px-3 py-2 items-center w-10 h-[26px] justify-center text-blue-normal bg-white rounded-[48px] hover:bg-white">
          <ChevronRight className="size-[10px]" />
        </Button>
      </div>
      <div className="flex flex-col p-5 headline-long-02 bg-white active:bg-gray-100 rounded-[20px]">
        {renderBannerContent()}
        {receive_status === ReceiveShareStatus.SHARING_CONFIRMED && (
          <div className="flex flex-row font-normal items-center text-sm text-gray-500 mt-2 gap-2">
            <span>1km</span>
            <span className="w-[1px] h-[10px] bg-[#D9D9D9]"></span>
            <span className="flex flex-row items-center gap-1">
              <Clock size={16} />
              <span>00:00 ~ 00:00</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
