import { ShareReceiveContent } from "./ShareReceiveContent";
import { ShareGiveContent } from "./ShareGiveContent";
import { GiveShareStatus } from "@/constants/status";
import { ReceiveShareStatus } from "@/constants/status";

export const ShareStatusContent = () => {
  return (
    <div className="w-full flex flex-col mt-2 gap-4">
      <ShareReceiveContent
        receive_status={ReceiveShareStatus.SHARING_CONFIRMED}
      />
      <ShareGiveContent give_status={GiveShareStatus.SHARING_CONFIRMED} />
    </div>
  );
};
