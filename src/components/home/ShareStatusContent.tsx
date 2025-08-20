import { ShareReceiveContent } from "./ShareReceiveContent";
import { ShareGiveContent } from "./ShareGiveContent";
import { ShareStatus } from "@/constants/status";
import { useWishInfinite } from "@/hooks/useWishInfinite";
import { useShareInfinite } from "@/hooks/useShareInfinite";
import { useShareClaimsStatusMap } from "@/hooks/useShareClaimsAcceptedMap";
import { useWishSentClaimsStatusMap } from "@/hooks/useWishSentClaimsStatusMap";

export const ShareStatusContent = () => {
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
  const shareItems = share?.flat ?? [];
  const shareIds = shareItems.map((s) => s.shareId);

  // 나눔 상품에 대한 요청 중, accepted 상태가 있는 지 확인 + accepted인 상대 가게 리스트 조회
  const {
    acceptedStoreIdsMap,
    anyAccepted,
    anyPendingOnly,
    isLoading: isClaimLoading,
    isError: isClaimError,
  } = useShareClaimsStatusMap(shareIds);

  const wishIds = wishItems.map((w) => w.wishId);

  // 내가 보낸 요청들 중, accepted를 받은 요청이 존재하는 지 확인
  const {
    anyAccepted: anyWishAccepted,
    anySent: anyWishSent, // ✅ 추가
    isLoading: isSentLoading,

    isError: isSentError,
  } = useWishSentClaimsStatusMap(wishIds);

  if (isWishLoading || isSentLoading)
    return <div className="p-4">불러오는 중…</div>;
  if (isWishError || isSentError)
    if (isShareLoading || isClaimLoading)
      // return <div className="p-4">목록을 불러오지 못했어요.</div>;

      return <div className="p-4">불러오는 중…</div>;
  if (isShareError || isClaimError)
    return <div className="p-4">목록을 불러오지 못했어요.</div>;

  return (
    <div className="w-full flex flex-col mt-5 gap-4">
      {/* 메인 페이지 윗부분 나눔 요청을 했는지 상태 체크 */}
      {wishItems.length === 0 ? (
        // 나눔 요청을 하지 않음
        <ShareReceiveContent receive_status={ShareStatus.NO_REQUEST} />
      ) : anyWishAccepted ? (
        // 보낸 요청들 중, accepted인 요청이 있음
        <ShareReceiveContent
          wishItems={wishItems}
          receive_status={ShareStatus.ACCEPTED}
        />
      ) : anyWishSent ? (
        // 아직 요청들 중, accepted가 없음
        <ShareReceiveContent
          wishItems={wishItems}
          receive_status={ShareStatus.PENDING}
        />
      ) : (
        <ShareReceiveContent
          wishItems={wishItems}
          receive_status={ShareStatus.NO_REQUEST}
          hasAnySentRequest={false}
        />
      )}

      {/* 메인 페이지 아래부분 나눔 상품 등록을 했는지 상태 체크 */}
      {shareItems.length === 0 ? (
        // 나눔 등록을 안함
        <ShareGiveContent />
      ) : anyAccepted ? (
        // 나눔 등록에 대해 받은 요청들 중, 수락한 요청이 존재
        <ShareGiveContent
          shareItems={shareItems}
          give_status={ShareStatus.ACCEPTED}
          acceptedStoreIds={acceptedStoreIdsMap}
        />
      ) : anyPendingOnly ? (
        // 요청은 받았는데 수락을 안함
        <ShareGiveContent
          shareItems={shareItems}
          give_status={ShareStatus.PENDING}
        />
      ) : (
        // 요청을 받지 못함
        <ShareGiveContent
          shareItems={shareItems}
          give_status={ShareStatus.NO_REQUEST}
        />
      )}
    </div>
  );
};
