import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSharePage } from "@/apis/share";
import type { ShareManageItem } from "@/types/share";
import type { ApiResponse, PageData } from "@/types/api";

export function useShareInfinite(size = 20) {
  return useInfiniteQuery<
    ApiResponse<PageData<ShareManageItem>>, // fetchSharePage 반환
    Error,
    {
      pages: PageData<ShareManageItem>[];
      flat: ShareManageItem[];
      pageParams: number[];
    }, // select 이후
    ["share", number], // TQueryKey
    number
  >({
    queryKey: ["share", size],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      fetchSharePage(pageParam, size),

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const pg = lastPage.data;
      return pg.last ? undefined : pg.number + 1;
    },
    select: (res) => {
      // 각 page의 data만 뽑아서 사용
      const pages = res.pages.map((p) => p.data);
      const flat = pages.flatMap((p) => p.content ?? []);
      return { pages, flat, pageParams: res.pageParams };
    },
    staleTime: 30_000,
  });
}
