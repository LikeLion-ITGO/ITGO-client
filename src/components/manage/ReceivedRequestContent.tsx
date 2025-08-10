import { PendingRequestList } from "./PendingRequestList";
import { ConfirmedCardSlider } from "./ConfirmedCardSlider";
export default function ReceivedRequestContent() {
  return (
    <div className="flex flex-col px-5 pt-6 gap-16">
      <ConfirmedCardSlider />

      {/* pending request section */}
      <div className="w-full flex flex-col gap-6">
        <div className="headline-02 flex flex-row gap-1">
          <span className="text-blue-normal-active">3명이</span>
          <span className="">도움을 필요로 해요</span>
        </div>
        <PendingRequestList />
      </div>
    </div>
  );
}
