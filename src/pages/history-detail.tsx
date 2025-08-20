import RegisterLayout from "@/components/layouts/RegisterLayout";
import { Separator } from "@radix-ui/react-separator";
import MailMilk from "@/assets/images/mail-milk.png";
import PresentSmall from "@/assets/icons/history/present-small.svg?react";
import HeartSmall from "@/assets/icons/history/heart-small.svg?react";
import ChevronRight from "@/assets/icons/history/chevron-right.svg?react";
import Phone from "@/assets/icons/history/phone.svg?react";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ShareCancelModal } from "@/components/history/ShareCancelModal";
import { toast } from "sonner";
import CheckCircle from "@/assets/icons/history/check-circle.svg?react";
import Stars from "@/assets/icons/history/stars.svg?react";
import { useParams } from "react-router-dom";
import { cancelTrade, completeTrade, getTradeDetail } from "@/apis/trade";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TradeDetail } from "@/types/trade";
import { useStoreIdStore } from "@/stores/\bstore";

export const HistoryDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const tradeId = Number(id);
  const qc = useQueryClient();

  const {
    data: trade,
    isLoading,
    error,
  } = useQuery<TradeDetail>({
    queryKey: ["trade-detail", tradeId],
    queryFn: () => getTradeDetail(tradeId),
    enabled: !!tradeId,
  });

  const { mutate: doComplete } = useMutation({
    mutationFn: () => completeTrade(tradeId),
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
      qc.invalidateQueries({ queryKey: ["trade-detail", tradeId] });
    },
    onError: () => {
      console.log("나눔 완료 처리에 실패했어요.");
    },
  });

  const { mutate: doCancel } = useMutation({
    mutationFn: () => cancelTrade(tradeId),
    onSuccess: () => {
      toast("나눔이 취소되었습니다!", {
        icon: <CheckCircle />,
        unstyled: true,
        classNames: {
          toast:
            "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
          title: "subhead-03 text-white",
        },
      });
      qc.invalidateQueries({ queryKey: ["trade-detail", tradeId] });
      setModalOpen(false);
    },
    onError: () => {
      toast.error("나눔 취소에 실패했어요.");
    },
  });

  const myStoreId = useStoreIdStore((s) => s.storeId);

  const isGiver =
    trade && myStoreId != null && trade.giver.storeId === myStoreId;
  const isReceiver =
    trade && myStoreId != null && trade.receiver.storeId === myStoreId;
  const isCanceled = trade?.status === "CANCELED";
  const isCompleted = trade?.status === "COMPLETED";
  const isActionable = !(isCanceled || isCompleted);

  const handleCancelModalClick = () => {
    setModalOpen(true);
  };

  const fmtYMD = (d?: string) => {
    if (!d) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d.replaceAll("-", ".");
    const dt = new Date(d);
    if (isNaN(+dt)) return d;
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const fmtMatch = (iso?: string) => {
    if (!iso) return "-";
    const dt = new Date(iso);
    if (isNaN(+dt)) return iso;
    const yoil = ["일", "월", "화", "수", "목", "금", "토"][dt.getDay()];
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    const hh = String(dt.getHours()).padStart(2, "0");
    const mi = String(dt.getMinutes()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}(${yoil}) ${hh}:${mi}`;
  };

  const hhmm = (t?: string) => (t ? t.slice(0, 5) : "--:--");
  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>에러가 발생했어요</div>;
  if (!trade) return <div>데이터가 없습니다.</div>;
  return (
    <RegisterLayout header={"나눔 내역 상세"}>
      <div className="flex flex-col pt-3 gap-6">
        {/* 나눔 상태 */}
        <div
          className={`w-fit headline-02 px-3 py-2 rounded-lg mb-1 mx-5 ${
            trade.status === "MATCHED"
              ? "text-blue-normal-hover bg-blue-light"
              : trade.status === "COMPLETED" || trade.status === "CANCELED"
              ? "text-gray-300 bg-gray-100"
              : ""
          }`}
        >
          {trade.status === "MATCHED"
            ? "나눔 매칭"
            : trade.status === "COMPLETED"
            ? "나눔 완료"
            : trade.status === "CANCELED"
            ? "나눔 취소"
            : ""}
        </div>

        <div className="flex flex-col px-5 gap-5">
          <span className="subhead-03 text-gray-800">나눔 물품</span>
          <div
            className="flex flex-row bg-white rounded-3xl border border-gray-100 p-5 gap-4"
            style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
          >
            <img
              src={trade.primaryImageUrl || MailMilk}
              alt={trade.itemName}
              className="h-[90px] w-[90px] rounded-full"
            />
            <div className="flex flex-col flex-1 gap-3">
              <div className="flex flex-col flex-1 justify-between">
                <div className="flex flex-col gap-[6px]">
                  <span className="subhead-02 text-gray-500">
                    {trade.brand}
                  </span>
                  <span className="headline-01 text-gray-900">
                    {trade.itemName} {trade.quantity}개
                  </span>
                </div>
                <div className="body-01 text-gray-500">
                  {fmtYMD(trade.expirationDate)}까지
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="h-2 bg-gray-100" />
        <div className="flex flex-col px-5 gap-5">
          <span className="subhead-03 text-gray-800">나눔 매칭 정보</span>
          <div className="flex flex-col gap-3">
            {/* 나눔번호 */}
            <span className="flex flex-row gap-8 text-gray-500">
              <span className="text-sm font-semibold  tracking--2">
                나눔번호
              </span>
              <span className="body-01 gray-500">{trade.tradeId}</span>
            </span>
            {/* 매칭일시 */}
            <span className="flex flex-row gap-8 text-gray-500">
              <span className="text-sm font-semibold tracking--2">
                매칭일시
              </span>
              <span className="body-01 gray-500">
                {fmtMatch(trade.matchedAt)}
              </span>
            </span>
            {/* 완료일시 */}
            <span className="flex flex-row gap-8 text-gray-500">
              <span className="text-sm font-semibold  tracking--2">
                완료일시
              </span>
              <span className="body-01">
                {trade.completedAt ? fmtMatch(trade.completedAt) : "-"}
              </span>
            </span>
          </div>
        </div>
        <Separator className="h-2 bg-gray-100" />
        <div className="flex flex-col gap-2 px-5">
          <span className="flex flex-row gap-1 text-sm font-medium text-blue-normal tracking--2 leading-[21px]">
            <PresentSmall />
            나눔하는 가게
          </span>
          <div className="flex flex-col gap-2 pl-7">
            <span className="headline-01 flex flex-row items-center gap-2">
              {trade.giver.storeName} <ChevronRight />
            </span>
            <div className="flex flex-col body-01 gap-[6px] text-gray-600">
              <span className="flex flex-row items-center gap-[6px]">
                <MapPin size={16} />
                {trade.giver.roadAddress}
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Clock size={16} />
                {hhmm(trade.giver.openTime)} ~ {hhmm(trade.giver.closeTime)}
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Phone />
                {trade.giver.phoneNumber}
              </span>
            </div>
          </div>
        </div>
        <Separator className="h-2 bg-gray-100" />
        <div
          className={`flex flex-col gap-2 px-5 pb-[65px] ${
            isActionable ? " mb-19" : "mb-0"
          }`}
        >
          <span className="flex flex-row gap-1 text-sm font-medium text-blue-normal tracking--2 leading-[21px]">
            <HeartSmall />
            나눔하는 가게
          </span>
          <div className="flex flex-col gap-2 pl-7">
            <span className="headline-01 flex flex-row items-center gap-2">
              {trade.receiver.storeName}
              <ChevronRight />
            </span>
            <div className="flex flex-col body-01 gap-[6px] text-gray-600">
              <span className="flex flex-row items-center gap-[6px]">
                <MapPin size={16} />
                {trade.receiver.roadAddress}
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Clock size={16} />
                {hhmm(trade.receiver.openTime)} ~
                {hhmm(trade.receiver.closeTime)}
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Phone />
                {trade.receiver.phoneNumber}
              </span>
            </div>
            {trade.status === "COMPLETED" && (
              <div className="w-full flex justify-center pt-5">
                <span className="w-fit flex flex-row justify-center px-[23.5px] py-2 gap-1 text-xs font-medium text-blue-normal bg-blue-light tracking--2 rounded-full">
                  <Stars />
                  나눔이 완료되었어요!
                </span>
              </div>
            )}
          </div>
        </div>
        {isActionable && (
          <div className="fixed bottom-0 w-full flex flex-row gap-[9px] pt-3 pb-4 px-5 border-t border-gray-100 bg-white">
            {isGiver && (
              <Button
                className="subhead-03 flex-1 h-12 text-blue-darker rounded-full bg-blue-light hover:bg-blue-light"
                onClick={handleCancelModalClick}
              >
                취소하기
              </Button>
            )}

            {isReceiver && (
              <>
                <Button
                  className="subhead-03 flex-1 h-12 text-blue-darker rounded-full bg-blue-light hover:bg-blue-light"
                  onClick={handleCancelModalClick}
                >
                  취소하기
                </Button>
                <Button
                  className="subhead-03 flex-1 h-12 text-white rounded-full bg-blue-normal hover:bg-blue-normal"
                  onClick={() => {
                    doComplete();
                  }}
                >
                  나눔 완료
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <ShareCancelModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => doCancel()}
      />
    </RegisterLayout>
  );
};
