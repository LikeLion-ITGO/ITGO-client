// src/hooks/useShareClaimsAcceptedMap.ts  → 이름/내용 확장
import { useMemo } from "react";
import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import { fetchReceivedClaims } from "@/apis/claim";
import type { ClaimItem } from "@/types/claim";

type ShareClaimStatus = {
  hasAccepted: boolean;
  hasPending: boolean;
  total: number;
};

export function useShareClaimsStatusMap(shareIds: number[]) {
  const ids = useMemo(
    () => Array.from(new Set(shareIds)).filter((n) => Number.isFinite(n)),
    [shareIds]
  );

  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["received-claims", id],
      queryFn: () => fetchReceivedClaims(id, 0, 10),
      staleTime: 30_000,
    })),
  }) as UseQueryResult<{ content: ClaimItem[] }, unknown>[];

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const { statusMap, acceptedStoreIdsMap } = useMemo(() => {
    const statusMap = new Map<number, ShareClaimStatus>();
    const acceptedStoreIdsMap = new Map<number, number[]>();

    results.forEach((r, idx) => {
      const id = ids[idx];
      const list = r.data?.content ?? [];
      const acceptedIds = list
        .filter((c) => c.status === "ACCEPTED")
        .map((c) => c.store?.storeId)
        .filter((v): v is number => Number.isFinite(v));

      const hasAccepted = list.some((c) => c.status === "ACCEPTED");
      const hasPending = list.some((c) => c.status === "PENDING");
      statusMap.set(id, { hasAccepted, hasPending, total: list.length });
      acceptedStoreIdsMap.set(id, acceptedIds);
    });
    return { statusMap, acceptedStoreIdsMap };
  }, [results, ids]);

  const anyAccepted = Array.from(statusMap.values()).some((s) => s.hasAccepted);
  const anyPendingOnly =
    !anyAccepted && Array.from(statusMap.values()).some((s) => s.hasPending);

  return {
    statusMap,
    acceptedStoreIdsMap,
    anyAccepted,
    anyPendingOnly,
    isLoading,
    isError,
  };
}
