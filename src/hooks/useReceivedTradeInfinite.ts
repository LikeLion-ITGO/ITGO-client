import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReceivedTradePage } from "@/apis/trade";
import type { TradeItem } from "@/types/trade";

export function useReceivedTradeInfinite(size = 20) {
  return useInfiniteQuery({
    queryKey: ["received-trades", size],
    queryFn: ({ pageParam = 0 }) => fetchReceivedTradePage(pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next < lastPage.totalPages ? next : undefined;
    },
    select: (data) => {
      const flat: TradeItem[] = data.pages.flatMap((p) => p.content);
      return { ...data, flat };
    },
    staleTime: 30_000,
  });
}
