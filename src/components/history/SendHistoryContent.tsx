import { ProductStatus } from "@/constants/status";
import { HistoryContent } from "./HistoryContent";

export const SendHistoryContent = () => {
  return (
    <div className="flex flex-col px-5 py-7 gap-16">
      <HistoryContent status={ProductStatus.MATCHED} />
      <HistoryContent status={ProductStatus.CONFIRMED} />
      <HistoryContent status={ProductStatus.CONFIRMED} />
    </div>
  );
};
