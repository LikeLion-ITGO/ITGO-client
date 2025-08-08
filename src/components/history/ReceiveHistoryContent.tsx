import { ProductStatus } from "@/constants/status";
import { HistoryContent } from "./HistoryContent";

export const ReceiveHistoryContent = () => {
  return (
    <div className="flex flex-col px-5 py-7 gap-16">
      <HistoryContent isReceived={true} status={ProductStatus.MATCHED} />
      <HistoryContent isReceived={true} status={ProductStatus.CONFIRMED} />
      <HistoryContent isReceived={true} status={ProductStatus.CONFIRMED} />
    </div>
  );
};
