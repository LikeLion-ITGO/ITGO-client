import { PendingRequestItem } from "./PendingRequestItem";

export const PendingRequestList = () => {
  return (
    <div className="flex flex-col gap-4">
      <PendingRequestItem />
      <PendingRequestItem />
      <PendingRequestItem />
      <PendingRequestItem />
    </div>
  );
};
