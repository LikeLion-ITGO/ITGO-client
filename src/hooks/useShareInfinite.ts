import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSharePage } from "@/apis/share";
import type { ShareItem, SharePageResp } from "@/types/share";

type Selected = {
  pages: SharePageResp[]; // ✅ ApiResponse 래퍼 배열
  pageParams: number[];
  flat: ShareItem[]; // 모든 페이지 content 평탄화
};

export function useShareInfinite(size = 20) {
  return useInfiniteQuery<
    SharePageResp, // TQueryFnData (한 페이지의 원본 타입)
    Error, // TError
    Selected, // TData (select 반환 타입)
    readonly ["share", number], // TQueryKey
    number // TPageParam
  >({
    queryKey: ["share", size] as const,
    queryFn: ({ pageParam = 0 }) => fetchSharePage(pageParam, size),

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const d = lastPage.data;
      return d.last ? undefined : d.number + 1; // ✅ 래퍼 내부 기준
    },

    select: (data): Selected => {
      const flat = data.pages.flatMap((p) => p.data?.content ?? []); // ✅ data.content
      return {
        pages: data.pages,
        pageParams: data.pageParams as number[],
        flat,
      };
    },

    staleTime: 30_000,
  });
}
