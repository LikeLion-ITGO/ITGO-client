import { PendingRequestList } from "./PendingRequestList";
import { ConfirmedCardSlider } from "./ConfirmedCardSlider";
import Present from "@/assets/icons/manage/present.svg?react";
import { ShareStatus } from "@/constants/status";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import type { ShareItem } from "@/types/share";
import { useState } from "react";
import { fetchReceivedClaims } from "@/apis/claim";
import { useQuery } from "@tanstack/react-query";
import type { PageData } from "@/types/api";
import type { ClaimItem } from "@/types/claim";

export default function ReceivedRequestContent({
  give_status,
  shareItems = [],
}: {
  give_status: ShareStatus;
  shareItems?: ShareItem[];
}) {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const activeShare = shareItems[activeIndex];

  // 활성 shareId의 클레임 조회
  const { data } = useQuery<PageData<ClaimItem>>({
    queryKey: ["received-claims", activeShare?.shareId],
    queryFn: () => fetchReceivedClaims(activeShare!.shareId, 0, 50),
    enabled: !!activeShare?.shareId,
    staleTime: 30_000,
  });

  const visibleClaims: ClaimItem[] = (data?.content ?? []).filter(
    (c) => c.status !== "CANCELED"
  );
  console.log("active", activeShare);
  console.log("data", data);

  return (
    <div className="flex flex-col px-5 pt-6 gap-16 pb-[30px]">
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
          <ConfirmedCardSlider
            shareItems={shareItems}
            onActiveIndexChange={(i) => setActiveIndex(i)}
          />
          {/* pending request section */}
          <div className="w-full flex flex-col gap-6">
            <div className="headline-02 flex flex-row gap-1">
              <span className="text-blue-normal-active">
                {visibleClaims?.length}명이
              </span>
              <span className="">도움을 필요로 해요</span>
            </div>
            <PendingRequestList
              claims={visibleClaims}
              shareId={activeShare?.shareId}
            />
          </div>
        </>
      )}
    </div>
  );
}
