import { formatTimeAgo } from "@/types/time";
import { SentRequestCardItem } from "./SentRequestCardItem";
import type { ClaimItem } from "@/types/claim";

export const SentRequestCardList = ({ claims }: { claims?: ClaimItem[] }) => {
  // const getTimeAgo = (dateStr?: string): number => {
  //   if (!dateStr) return 0;
  //   const date = new Date(dateStr);
  //   const now = new Date();
  //   const diffMs = now.getTime() - date.getTime();
  //   const diffMinutes = Math.floor(diffMs / 1000 / 60);

  //   return diffMinutes;
  // };

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
            minutesAgo={formatTimeAgo(claim?.regDate)}
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
