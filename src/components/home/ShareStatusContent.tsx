import { ShareReceiveContent } from "./ShareReceiveContent";
import { ShareGiveContent } from "./ShareGiveContent";
import { GiveShareStatus } from "@/constants/status";
import { ReceiveShareStatus } from "@/constants/status";

export const ShareStatusContent = () => {
  return (
    <div className="w-full flex flex-col mt-5 gap-4">
      <ShareReceiveContent
        receive_status={ReceiveShareStatus.SHARING_CONFIRMED}
      />
      {/* <ShareReceiveContent
        receive_status={ReceiveShareStatus.MATCHING_IN_PROGRESS}
      /> */}
      {/* <ShareReceiveContent receive_status={ReceiveShareStatus.NO_REQUEST} /> */}
      {/* <ShareGiveContent give_status={GiveShareStatus.NO_REQUEST} /> */}
      {/* <ShareGiveContent give_status={GiveShareStatus.MATCHING_IN_PROGRESS} />
      <ShareGiveContent give_status={GiveShareStatus.RECEIVED_REQUEST} /> */}
      <ShareGiveContent give_status={GiveShareStatus.SHARING_CONFIRMED} />
    </div>
  );
};
