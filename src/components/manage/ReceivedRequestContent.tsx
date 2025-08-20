import { PendingRequestList } from "./PendingRequestList";
import { ConfirmedCardSlider } from "./ConfirmedCardSlider";
import Present from "@/assets/icons/manage/present.svg?react";
import { ShareStatus } from "@/constants/status";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function ReceivedRequestContent({
  give_status,
}: {
  give_status: ShareStatus;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-5 pt-6 gap-16">
      {give_status === ShareStatus.NO_REQUEST ? (
        <div className="flex flex-col items-center gap-4 pt-[171px]">
          <div className="flex flex-col items-center headline-long-02 text-gray-900">
            <span>아직 받은 요청이</span>
            <span>없습니다</span>
          </div>
          <Present />
          <Button
            className="subhead-03 h-12 text-blue-normal-hover px-[46px] bg-blue-light rounded-full hover:bg-blue-light-hover active:bg-blue-light-active"
            onClick={() => navigate(ROUTES.REGISTER_GIVE)}
          >
            나눔 올리기
          </Button>
        </div>
      ) : (
        <>
          <ConfirmedCardSlider />
          {/* pending request section */}
          <div className="w-full flex flex-col gap-6">
            <div className="headline-02 flex flex-row gap-1">
              <span className="text-blue-normal-active">3명이</span>
              <span className="">도움을 필요로 해요</span>
            </div>
            <PendingRequestList />
          </div>
        </>
      )}
    </div>
  );
}
