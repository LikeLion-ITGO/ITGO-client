import type { ClaimItem } from "@/types/claim";
import { PendingRequestItem } from "./PendingRequestItem";

export const PendingRequestList = ({
  claims = [],
  shareId,
}: {
  claims?: ClaimItem[];
  shareId?: number;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {claims.map((claim) => (
        <PendingRequestItem
          key={claim.claimId}
          claim={claim}
          shareId={shareId}
        />
      ))}
    </div>
  );
};
