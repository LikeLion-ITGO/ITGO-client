// src/hooks/useGivenTradesInfinite.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSentTradePage } from "@/apis/trade";

export function useGivenTradesInfinite(size = 20) {
  return useInfiniteQuery({
    queryKey: ["given-trades", size],
    queryFn: ({ pageParam = 0 }) => fetchSentTradePage(pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next < lastPage.totalPages ? next : undefined;
    },
    staleTime: 30_000,
  });
}
