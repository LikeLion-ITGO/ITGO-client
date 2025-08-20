import { ShareStatus } from "@/constants/status";
import { SentRequestCardItem } from "./SentRequestCardItem";

export const SentRequestCardList = ({
  receive_status,
}: {
  receive_status: ShareStatus;
}) => {
  return (
    <>
      {receive_status === ShareStatus.PENDING ? (
        <div className="flex flex-col gap-4">
          <SentRequestCardItem />
          <SentRequestCardItem />
          <SentRequestCardItem />
          <SentRequestCardItem />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <SentRequestCardItem status={ShareStatus.ACCEPTED} />
          <SentRequestCardItem status={ShareStatus.PENDING} />
          <SentRequestCardItem status={ShareStatus.PENDING} />
          <SentRequestCardItem status={ShareStatus.PENDING} />
        </div>
      )}
    </>
  );
};
