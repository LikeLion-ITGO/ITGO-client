import type { ClaimItem } from "@/types/claim";
import { Button } from "../ui/button";

function timeAgo(iso?: string) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

export const PendingRequestItem = ({ claim }: { claim: ClaimItem }) => {
  const when = timeAgo(claim.regDate);

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
              <Button className="bg-white hover:bg-gray-100 border border-blue-normal ml-3 text-blue-normal rounded-full">
                수락
              </Button>
            )}
          </div>
        </div>
      </div>
      {!isPending && (
        <Button className="bg-white hover:bg-gray-100 border border-blue-normal text-blue-normal rounded-full mt-6">
          나눔 내역 상세
        </Button>
      )}
    </div>
  );
};
