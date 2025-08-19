// import { ShareStatus } from "@/constants/status";
import { SentRequestCardItem } from "./SentRequestCardItem";
import type { ClaimItem } from "@/types/claim";

export const SentRequestCardList = ({
  // receive_status,
  claims,
}: {
  // receive_status: ShareStatus;
  claims?: ClaimItem[];
}) => {
  console.log(claims);
  return (
    <>
      <div className="flex flex-col gap-4">
        {claims?.map((claim) => (
          <SentRequestCardItem key={claim.claimId} claim={claim} />
        ))}
      </div>
    </>
  );
};
