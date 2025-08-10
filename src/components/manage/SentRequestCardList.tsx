import { ReceiveShareStatus } from "@/constants/status";
import { SentRequestCardItem } from "./SentRequestCardItem";

export const SentRequestCardList = ({
  receive_status,
}: {
  receive_status: ReceiveShareStatus;
}) => {
  return (
    <>
      {receive_status === ReceiveShareStatus.MATCHING_IN_PROGRESS ? (
        <div className="flex flex-col gap-4">
          <SentRequestCardItem />
          <SentRequestCardItem />
          <SentRequestCardItem />
          <SentRequestCardItem />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <SentRequestCardItem status={ReceiveShareStatus.SHARING_CONFIRMED} />
          <SentRequestCardItem status={ReceiveShareStatus.NO_REQUEST} />
          <SentRequestCardItem status={ReceiveShareStatus.NO_REQUEST} />
          <SentRequestCardItem status={ReceiveShareStatus.NO_REQUEST} />
        </div>
      )}
    </>
  );
};
