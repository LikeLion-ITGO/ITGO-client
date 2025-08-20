import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchWishPage } from "@/apis/wish";
import type { WishItem } from "@/types/wish";

export function useWishInfinite(size = 20) {
  return useInfiniteQuery({
    queryKey: ["wish", size],
    queryFn: ({ pageParam = 0 }) => fetchWishPage(pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next < lastPage.totalPages ? next : undefined;
    },
    select: (data) => {
      const flat: WishItem[] = data.pages.flatMap((p) => p.content);
      return { ...data, flat };
    },
  });
}
