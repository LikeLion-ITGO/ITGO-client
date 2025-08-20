import MailMilk from "@/assets/images/mail-milk.png";
import { Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Phone from "@/assets/icons/history/phone.svg?react";
import { toast } from "sonner";
import CheckCircle from "@/assets/icons/history/check-circle.svg?react";
import type { TradeItem } from "@/types/trade";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTrade } from "@/apis/trade";

interface HistoryContentProps {
  status: string;
  isReceived?: boolean;
  trade: TradeItem;
}

export const HistoryContent = ({
  status,
  isReceived,
  trade,
}: HistoryContentProps) => {
  const queryClient = useQueryClient();

  const toHHmm = (t?: string) => (t ? t.slice(0, 5) : "--:--");

  const { mutate: completeMutate } = useMutation({
    mutationFn: () => completeTrade(Number(trade.tradeId)),
    onSuccess: () => {
      toast("나눔이 완료되었습니다!", {
        icon: <CheckCircle />,
        unstyled: true,
        classNames: {
          toast:
            "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
          title: "subhead-03 text-white",
        },
      });

      queryClient.invalidateQueries({ queryKey: ["given-trades"] });
      queryClient.invalidateQueries({ queryKey: ["received-trades"] });
    },
    onError: (err) => {
      console.log(err);
      toast("나눔 완료 처리에 실패했어요.");
    },
  });

  const renderStatusText = () => {
    switch (status) {
      case "COMPLETED":
        return "나눔 완료";
      default:
        return "나눔 매칭";
    }
  };

  const openTime = isReceived ? trade.giverOpenTime : trade.receiverOpenTime;
  const closeTime = isReceived ? trade.giverCloseTime : trade.receiverCloseTime;
  const phoneNumber = isReceived
    ? trade.giverPhoneNumber
    : trade.receiverPhoneNumber;

  const roadAddress = isReceived
    ? trade.giverRoadAddress
    : trade.receiverRoadAddress;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <span className="body-01 text-gray-500">2025.11.11</span>
        <span
          className={`subhead-03 ${
            status === "COMPLETED" ? "text-gray-500" : "text-blue-normal-hover"
          }`}
        >
          {renderStatusText()}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className="flex flex-row bg-white rounded-3xl border border-gray-100 p-5 gap-4"
          style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
        >
          <img
            src={MailMilk}
            alt="매일 우유"
            className="h-[90px] w-[90px] rounded-full"
          />
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-[6px]">
                <span className="subhead-02 text-gray-500">{trade.brand}</span>
                <span className="headline-01 text-gray-900">
                  {trade.itemName}
                  {"\u00A0"}
                  {trade.wishQuantity}개
                </span>
              </div>
              <div className="caption text-gray-200">5분 전</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="body-01 text-gray-500 flex flex-row items-center gap-2">
                <span>1km</span>
                <span className="w-[1px] h-[10px] bg-[#D9D9D9]"></span>
                <span className="flex flex-row items-center gap-1">
                  <Clock size={16} />
                  <span>
                    {toHHmm(openTime)} ~{toHHmm(closeTime)}
                  </span>
                </span>
              </div>
              <div className="body-01 text-gray-500">
                {trade.expirationDate}까지
              </div>
            </div>
          </div>
        </div>

        {/* 가게 정보 */}
        <div
          className="flex flex-row bg-white rounded-3xl border border-gray-100 pl-6 pr-[27px] py-7 gap-4"
          style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="flex flex-col flex-1 gap-4">
            <div className="headline-01 text-gray-900">{trade.brand}</div>
            <div className="flex flex-col body-01 gap-[6px] text-gray-600">
              <span className="flex flex-row items-center gap-[6px]">
                <MapPin size={16} />
                {roadAddress}
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Clock size={16} />
                {toHHmm(openTime)} ~ {toHHmm(closeTime)}
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Phone />
                {phoneNumber}
              </span>
            </div>
          </div>
          <img
            src={MailMilk}
            alt="매일 우유"
            className="h-[90px] w-[90px] rounded-full"
          />
        </div>
      </div>

      {isReceived && status === "MATCHED" && (
        <Button
          className="subhead-03 w-full h-12 text-white bg-blue-normal hover:bg-blue-normal-hover rounded-full"
          onClick={() => completeMutate()}
        >
          나눔 완료
        </Button>
      )}
    </div>
  );
};
