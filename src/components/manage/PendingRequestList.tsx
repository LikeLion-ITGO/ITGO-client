import type { ClaimItem } from "@/types/claim";
import { PendingRequestItem } from "./PendingRequestItem";

export const PendingRequestList = ({
  claims = [],
}: {
  claims?: ClaimItem[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      {claims.map((claim) => (
        <PendingRequestItem key={claim.claimId} claim={claim} />
      ))}
    </div>
  );
};
