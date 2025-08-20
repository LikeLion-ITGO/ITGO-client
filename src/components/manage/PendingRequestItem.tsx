import type { ClaimItem } from "@/types/claim";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptClaim } from "@/apis/claim";
import { useEffect, useState } from "react";
import { ROUTES } from "@/constants/routes";

export const PendingRequestItem = ({
  claim,
  shareId,
}: {
  claim: ClaimItem;
  shareId?: number;
}) => {
  const [awaitingAccept, setAwaitingAccept] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { mutate: accept } = useMutation({
    mutationFn: (id: number) => acceptClaim(id),
    onSuccess: () => {
      console.log("수락완료");
      if (shareId) {
        qc.invalidateQueries({ queryKey: ["received-claims", shareId] });
      } else {
        qc.invalidateQueries({ queryKey: ["received-claims"] });
      }
    },
    onError: (err) => {
      console.error("수락 실패:", err);
      setAwaitingAccept(false);
    },
  });

  useEffect(() => {
    if (awaitingAccept && claim.tradeId) {
      navigate(ROUTES.SUCCESS.replace(":id", String(claim.tradeId)));
    }
  }, [awaitingAccept, claim.tradeId, navigate]);

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 1000 / 60);

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours}시간 전`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}일 전`;
  };

  const when = getTimeAgo(claim.regDate);

  const isPending = claim.status === "PENDING";

  return (
    <div
      className="flex flex-col p-5 bg-white border border-gray-100 rounded-3xl"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex flex-row   gap-4">
        <div className="flex flex-row flex-1 justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-[6px]">
              <span className="subhead-02 text-gray-500">
                {claim.store.name}
              </span>
              <span className="headline-01 text-gray-900">
                {claim.wish.title}
              </span>
            </div>
            <span className="body-long-01 text-gray-500">
              {claim.wish.description}
            </span>
          </div>
          <div className="flex flex-col justify-between items-end">
            <span className="caption text-gray-200">{when}</span>
            {isPending && (
              <Button
                className="bg-white hover:bg-gray-100 border border-blue-normal ml-3 text-blue-normal rounded-full"
                onClick={() => {
                  setAwaitingAccept(true);
                  accept(claim.claimId);
                }}
              >
                수락
              </Button>
            )}
          </div>
        </div>
      </div>
      {!isPending && (
        <Button
          className="bg-white hover:bg-gray-100 border border-blue-normal text-blue-normal rounded-full mt-6"
          onClick={() => {
            if (claim.tradeId) {
              navigate(
                ROUTES.HISTORY_DETAIL.replace(":id", String(claim.tradeId))
              );
            }
          }}
        >
          나눔 내역 상세
        </Button>
      )}
    </div>
  );
};
