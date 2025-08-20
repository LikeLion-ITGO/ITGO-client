import { HistoryContent } from "./HistoryContent";
import { useReceivedTradeInfinite } from "@/hooks/useReceivedTradeInfinite";

export const ReceiveHistoryContent = () => {
  const { data, isLoading, isError } = useReceivedTradeInfinite(20);
  const trades = data?.flat ?? [];

  if (isLoading) return <div className="px-5 py-7">로딩 중…</div>;
  if (isError) return <div className="px-5 py-7">불러오기에 실패했어요.</div>;

  return (
    <div className="flex flex-col px-5 py-7 gap-16">
      {trades.map((trade) => (
        <HistoryContent
          key={trade.tradeId}
          status={trade.status}
          isReceived={true}
          trade={trade ?? []}
        />
      ))}
    </div>
  );
};
