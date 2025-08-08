import { ReceiveShareStatus } from "@/constants/status";
import { SentRequestCardList } from "./SentRequestCardList";

export default function SentRequestContent({
  receive_status,
}: {
  receive_status: ReceiveShareStatus;
}) {
  return (
    <div className="flex flex-col px-5 pt-6 gap-16">
      {/* 보낸 요청 */}
      <div className="min-w-full flex-shrink-0 snap-center">
        <div
          className="flex flex-row p-5 bg-white border border-gray-100 rounded-3xl gap-4"
          style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="flex flex-row flex-1 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-row justify-between">
                  <span className="subhead-02 text-gray-500">요청 제목</span>
                  <span className="caption text-gray-200">5분 전</span>
                </div>
                <span className="headline-01 text-gray-900">
                  요청 품목 수량
                </span>
              </div>
              <span className="body-01 text-gray-500">
                나눔 요청 내용나눔 요청 내용나눔 요청 내용나눔 요청 내용나눔
                요청 내용나눔 요청 내용나눔 요청 내용나내용나내용나
              </span>
            </div>
          </div>
        </div>
      </div>

      {receive_status === ReceiveShareStatus.MATCHING_IN_PROGRESS && (
        // 나눔 요청 상태
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col gap-6">
            <div className="headline-02 flex flex-row gap-1">
              <span className="text-blue-normal-active">3명에게</span>
              <span className="">도움을 요청했어요</span>
            </div>
          </div>

          {/* 거래 내역 */}
          <SentRequestCardList receive_status={receive_status} />
        </div>
      )}

      {receive_status === ReceiveShareStatus.SHARING_CONFIRMED && (
        // 나눔 요청 상태
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col gap-6">
            <div className="headline-02 flex flex-row gap-1">
              <span className="">나눔이 성사됐어요!</span>
            </div>
          </div>

          {/* 거래 내역 */}
          <SentRequestCardList receive_status={receive_status} />
        </div>
      )}
    </div>
  );
}
