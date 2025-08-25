import { SentRequestCardItem } from "./SentRequestCardItem";
import type { ClaimItem } from "@/types/claim";

export const SentRequestCardList = ({ claims }: { claims?: ClaimItem[] }) => {
  const getMinutesAgo = (dateStr?: string): number => {
    if (!dateStr) return 0;
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    return Math.floor(diffMs / 1000 / 60); // 분 단위 차이
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {claims?.map((claim) => (
          <SentRequestCardItem
            key={claim.claimId}
            claimId={claim.claimId}
            brand={claim.share?.brand}
            itemName={claim.share?.itemName}
            quantity={claim.share?.quantity}
            minutesAgo={getMinutesAgo(claim?.regDate)}
            distanceKm={claim.distanceKm}
            openTime={claim.share?.openTime}
            closeTime={claim.share?.closeTime}
            expirationDate={claim.share?.expirationDate}
            primaryImageUrl={claim.share?.primaryImageUrl}
            status={claim.status}
            tradeId={claim.tradeId}
            shareId={claim.share?.shareId}
          />
        ))}
      </div>
    </>
  );
};
