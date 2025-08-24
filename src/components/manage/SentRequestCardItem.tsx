import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { ShareStatus } from "@/constants/status";

// import MailMilk from "@/assets/images/mail-milk.png";
//import { ReceiveShareStatus } from "@/constants/status";

import { useState } from "react";
import Dot from "@/assets/icons/manage/dot.svg?react";
import { formatLocalTime, type LocalTime } from "@/types/time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelClaim, createClaim } from "@/apis/claim";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const SentRequestCardItem = ({
  status,
  isRecommend,
  claimId,
  brand,
  itemName,
  quantity,
  minutesAgo,
  distanceKm,
  openTime,
  closeTime,
  expirationDate,
  primaryImageUrl,
  tradeId,
  wishId,
  shareId,
}: {
  status?: string;
  isRecommend?: boolean;
  claimId?: number;
  brand?: string;
  itemName?: string;
  quantity?: number;
  minutesAgo?: number;
  distanceKm?: number;
  openTime?: string | LocalTime;
  closeTime?: string | LocalTime;
  expirationDate?: string;
  primaryImageUrl?: string;
  tradeId?: number;
  wishId?: number;
  shareId?: number;
}) => {
  const [requested, setRequested] = useState(false);
  const isRequested = isRecommend && requested;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { mutate: doCancel } = useMutation({
    mutationFn: (id: number) => cancelClaim(id),
    onSuccess: () => {
      console.log("취소 성공");
      qc.invalidateQueries({ queryKey: ["sent-claims"] });
      qc.invalidateQueries({ queryKey: ["received-claims"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: doCreate } = useMutation({
    mutationFn: () => {
      if (!wishId || !shareId) throw new Error("error");
      return createClaim({ wishId, shareId });
    },
    onSuccess: () => {
      setRequested(true);
      qc.invalidateQueries({ queryKey: ["sent-claims"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // const formatDate = (dateStr?: string) => {
  //   if (!dateStr) return "";
  //   const d = new Date(dateStr);
  //   const yyyy = d.getFullYear();
  //   const mm = String(d.getMonth() + 1).padStart(2, "0");
  //   const dd = String(d.getDate()).padStart(2, "0");
  //   return `${yyyy}.${mm}.${dd}`;
  // };

  const renderStatusText = () => {
    switch (status) {
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
      : status === ShareStatus.NO_REQUEST || status === "REJECTED"
      ? "bg-gray-50 border-gray-300 text-gray-300 pointer-events-none"
      : "bg-white hover:bg-gray-100 border-blue-normal text-blue-normal");

  const handleButtonClick = () => {
    if (status === "REJECTED") return;
    if (isRecommend) {
      if (requested) return;
      if (!wishId || !shareId) return;
      doCreate();
      return;
    }
    if (status === "PENDING" && claimId) {
      doCancel(claimId);
    }
    if (status === "ACCEPTED" && tradeId) {
      navigate(ROUTES.HISTORY_DETAIL.replace(":id", String(tradeId)));
    }
  };

  return (
    <div
      className="relative flex flex-col p-5 bg-white border border-gray-100 rounded-3xl gap-6"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
      onClick={() => navigate(`/sharelist/${shareId}`)}
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
          {primaryImageUrl ? (
            <img
              src={primaryImageUrl}
              alt={itemName}
              className="h-[90px] w-[90px] rounded-full object-cover "
            />
          ) : (
            <div className="h-[90px] w-[90px] rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No Img
            </div>
          )}
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-[6px]">
                <span className="subhead-02 text-gray-500">
                  {brand ? `[${brand}]` : "[브랜드 없음]"}
                </span>
                <span className="headline-01 text-gray-900">
                  {itemName} {quantity && ` ${quantity}개`}
                </span>
              </div>
              <span className="caption text-gray-200">{minutesAgo}</span>
            </div>
            <div className="flex flex-col gap-2 body-01 text-gray-500">
              <div className="flex flex-row gap-2">
                <span>{distanceKm}km</span>
                <span className="w-[1px] h-[10px] bg-[#D9D9D9]"></span>
                <span className="flex flex-row items-center gap-1">
                  <Clock size={16} />
                  <span>
                    {formatLocalTime(openTime)} ~ {formatLocalTime(closeTime)}
                  </span>
                </span>
              </div>

              <span>
                {expirationDate?.replace("-", ".").replace("-", ".")}까지
              </span>
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
