import { useMemo } from "react";
import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import { fetchSentClaims } from "@/apis/claim";
import type { ClaimItem } from "@/types/claim";

type WishSentStatus = {
  hasAccepted: boolean;
  hasPending: boolean;
  total: number;
};

export function useWishSentClaimsStatusMap(wishIds: number[]) {
  const ids = useMemo(
    () => Array.from(new Set(wishIds)).filter((n) => Number.isFinite(n)),
    [wishIds]
  );

  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["sent-claims", id],
      queryFn: () => fetchSentClaims(id, 0, 20),
      staleTime: 30_000,
    })),
  }) as UseQueryResult<{ content: ClaimItem[] }, unknown>[];

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const statusMap = useMemo(() => {
    const map = new Map<number, WishSentStatus>();
    results.forEach((r, idx) => {
      const id = ids[idx];
      const list = r.data?.content ?? [];
      const hasAccepted = list.some((c) => c.status === "ACCEPTED");
      const hasPending = list.some((c) => c.status === "PENDING");
      map.set(id, { hasAccepted, hasPending, total: list.length });
    });
    return map;
  }, [results, ids]);

  // 홈 배너 등 “전체 요약”용
  const anyAccepted = Array.from(statusMap.values()).some((s) => s.hasAccepted);
  const anySent = Array.from(statusMap.values()).some((s) => s.total > 0); // ✅ 추가

  return { statusMap, anyAccepted, anySent, isLoading, isError };
}
