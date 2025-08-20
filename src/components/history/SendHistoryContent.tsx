// SendHistoryContent.tsx
import { useGivenTradesInfinite } from "@/hooks/useGivenTradesInfinite";
import type { TradeItem } from "@/types/trade";
import { HistoryContent } from "./HistoryContent";

export const SendHistoryContent = () => {
  const { data, isFetchingNextPage, isLoading, isError } =
    useGivenTradesInfinite(20);

  // 전체 아이템 평탄화
  const allTrades: TradeItem[] =
    data?.pages.flatMap((p) => p.content ?? []) ?? [];

  console.log(allTrades);
  if (isLoading)
    return <div className="px-5 py-7 text-gray-500">불러오는 중…</div>;
  if (isError)
    return (
      <div className="px-5 py-7 text-red-500">목록을 불러오지 못했어요.</div>
    );

  return (
    <div className="flex flex-col px-5 py-7 gap-8">
      {allTrades.length === 0 ? (
        <div className="text-sm text-gray-400">내역이 없어요.</div>
      ) : (
        allTrades.map((trade) => (
          <HistoryContent
            key={trade.tradeId}
            status={trade.status ?? "MATCHED"}
            isReceived={false}
            trade={trade}
          />
        ))
      )}

      {/* 더 보기 / 로딩 상태 */}
      <div className="mt-2 text-center text-xs text-gray-400">
        {isFetchingNextPage && "불러오는 중…"}
      </div>
    </div>
  );
};
