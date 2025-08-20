import { useQuery } from "@tanstack/react-query";
import { fetchSentClaims } from "@/apis/claim";

export function useSentClaims(wishId?: number, page = 0, size = 10) {
  return useQuery({
    queryKey: ["sent-claims", wishId, page, size],
    queryFn: () => {
      if (wishId == null) throw new Error("wishId is required");
      return fetchSentClaims(wishId, page, size);
    },
    enabled: Number.isFinite(wishId),
    staleTime: 30_000,
  });
}
