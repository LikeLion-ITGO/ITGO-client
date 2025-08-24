import ManageLayout from "@/components/layouts/ManageLayout";
import { useEffect, useState } from "react";
import ReceivedRequestContent from "@/components/manage/ReceivedRequestContent";
import SentRequestContent from "@/components/manage/SentRequestContent";
import { ShareStatus } from "@/constants/status";
import { useWishInfinite } from "@/hooks/useWishInfinite";
import { useShareInfinite } from "@/hooks/useShareInfinite";
// import type { InfiniteData } from "@tanstack/react-query";
// import type { PageData } from "@/types/api";
// import type { ShareItem } from "@/types/share";

export default function Manage({ status }: { status: string }) {
  const [selectedTab, setSelectedTab] = useState(0);

  // wish 목록 조회
  const {
    data: wish,
    isLoading: isWishLoading,
    isError: isWishError,
  } = useWishInfinite(1);

  // share 목록 조회
  const {
    data: share,
    isLoading: isShareLoading,
    isError: isShareError,
  } = useShareInfinite(20);

  const wishItems = wish?.flat ?? [];

  // const sharePages = (share as InfiniteData<PageData<ShareItem>> | undefined)
  //   ?.pages;

  const shareItems = share?.flat ?? [];
  // const shareItems: ShareItem[] =
  //   sharePages?.flatMap((p) => p.content ?? []) ?? [];

  useEffect(() => {
    setSelectedTab(status === "receive" ? 0 : 1);
  }, [status]);

  if (isWishLoading) return <div className="p-4">불러오는 중…</div>;
  if (isWishError) return <div className="p-4">목록을 불러오지 못했어요.</div>;

  if (isShareLoading) return <div className="p-4">불러오는 중…</div>;
  if (isShareError) return <div className="p-4">목록을 불러오지 못했어요.</div>;

  return (
    <ManageLayout
      title={"나눔현황"}
      category={["받은 요청", "보낸 요청"]}
      route={["/manage/receive", "/manage/give"]}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      {selectedTab === 0 ? (
        shareItems.length ? (
          <ReceivedRequestContent
            give_status={ShareStatus.PENDING}
            shareItems={shareItems}
          />
        ) : (
          <ReceivedRequestContent give_status={ShareStatus.NO_REQUEST} />
        )
      ) : wishItems.length ? (
        <SentRequestContent
          wish={wishItems[0]}
          receive_status={ShareStatus.PENDING}
          wishId={wishItems[0].wishId}
        />
      ) : (
        <SentRequestContent receive_status={ShareStatus.NO_REQUEST} />
      )}
    </ManageLayout>
  );
}
