import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { ShareStatus } from "@/constants/status";
import { useState } from "react";
import Dot from "@/assets/icons/manage/dot.svg?react";
import type { ClaimItem } from "@/types/claim";
import DefaultImage from "@/assets/images/mail-milk.png"; // 기본 이미지

export const SentRequestCardItem = ({
  status,
  isRecommend,
  claim,
}: {
  status?: ShareStatus;
  isRecommend?: boolean;
  claim?: ClaimItem;
}) => {
  const [requested, setRequested] = useState(false);
  const isRequested = isRecommend && requested;

  const shareItem = claim?.share;

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 1000 / 60);

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}시간 전`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const renderStatusText = () => {
    switch (claim?.status) {
      case "ACCEPTED":
        return "나눔 내역 상세";
      default:
        return "요청 취소";
    }
  };

  const buttonLabel = isRecommend
    ? requested
      ? "요청완료"
      : "요청하기"
    : renderStatusText();

  const buttonClasses =
    "subhead-03 h-11 rounded-full border " +
    (isRecommend
      ? isRequested
        ? "bg-gray-50 border-gray-300 text-gray-300 pointer-events-none"
        : "bg-white hover:bg-gray-100 border-blue-normal text-blue-normal"
      : status === ShareStatus.NO_REQUEST
      ? "bg-gray-50 border-gray-300 text-gray-300 pointer-events-none"
      : "bg-white hover:bg-gray-100 border-blue-normal text-blue-normal");

  const handleButtonClick = () => {
    if (isRecommend && !requested) {
      setRequested(true);
    }
  };

  return (
    <div
      className="relative flex flex-col p-5 bg-white border border-gray-100 rounded-3xl gap-6"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <span
        className="absolute top-0 left-0 w-[81px] h-[25px] flex flex-row items-center justify-center text-[10px] font-bold text-white rounded-br-lg rounded-tl-[24px] gap-1"
        style={{
          background:
            "linear-gradient(95.66deg, #54B7FF 14.18%, #2695E8 97.19%)",
        }}
      >
        <Dot /> 신선도 보장
      </span>
      <div className="flex flex-row justify-between">
        <div className="w-full flex flex-row gap-4">
          <img
            src={shareItem?.primaryImageUrl || DefaultImage}
            alt={shareItem?.itemName}
            className="h-[90px] w-[90px] rounded-full"
          />
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-[6px]">
                <span className="subhead-02 text-gray-500">
                  {shareItem?.brand}
                </span>
                <span className="headline-01 text-gray-900 ">
                  {shareItem?.itemName}&nbsp;
                  {shareItem?.quantity}개
                </span>
              </div>
              <span className="caption text-gray-200">
                {getTimeAgo(claim?.regDate)}
              </span>
            </div>
            <div className="flex flex-col gap-2 body-01 text-gray-500">
              <div className="flex flex-row gap-2">
                <span>{claim?.distanceKm}km</span>
                <span className="w-[1px] h-[10px] bg-[#D9D9D9]"></span>
                <span className="flex flex-row items-center gap-1">
                  <Clock size={16} />
                  <span>00:00 ~ 00:00</span>
                </span>
              </div>
              <span>{formatDate(shareItem?.expirationDate)}까지</span>
            </div>
          </div>
        </div>
      </div>

      <Button className={buttonClasses} onClick={handleButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
};
