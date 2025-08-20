import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSharePage } from "@/apis/share";
import type { ShareItem } from "@/types/share";

export function useShareInfinite(size = 20) {
  return useInfiniteQuery({
    queryKey: ["share", size],
    queryFn: ({ pageParam = 0 }) => fetchSharePage(pageParam, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next < lastPage.totalPages ? next : undefined;
    },
    select: (data) => {
      const flat: ShareItem[] = data.pages.flatMap((p) => p.content);
      return { ...data, flat };
    },
  });
}
