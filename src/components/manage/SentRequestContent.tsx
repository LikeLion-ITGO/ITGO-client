import { ShareStatus } from "@/constants/status";
import { SentRequestCardList } from "./SentRequestCardList";
import Heart from "@/assets/icons/manage/heart.svg?react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function SentRequestContent({
  receive_status,
}: {
  receive_status: ShareStatus;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-5 pt-6 gap-16">
      {receive_status === ShareStatus.NO_REQUEST ? (
        <div className="flex flex-col items-center gap-4 pt-[171px]">
          <div className="flex flex-col items-center headline-long-02 text-gray-900">
            <span>아직 보낸 요청이</span>
            <span>없습니다</span>
          </div>
          <Heart />
          <Button
            className="subhead-03 h-12 text-blue-normal-hover px-[30.5px] bg-blue-light hover:bg-blue-light-hover active:bg-blue-light-active rounded-full"
            onClick={() => {
              navigate(ROUTES.SHARELIST);
            }}
          >
            나눔 리스트 보기
          </Button>
        </div>
      ) : (
        <>
          <div
            className="flex flex-row p-5 bg-white border border-gray-100 rounded-3xl gap-4"
            style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="flex flex-1 flex-row justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-[6px]">
                  <span className="subhead-02 text-gray-500">요청 제목</span>
                  <span className="headline-01 text-gray-900">
                    요청 품목 수량
                  </span>
                </div>
                <span className="body-long-01 text-gray-500">
                  나눔 요청 내용나눔 요청 내용나눔 요청 내용나눔 요청 내용나눔
                  요청 내용나눔 요청 내용나눔 요청 내용나내용나내용나
                </span>
              </div>
              <span className="caption text-gray-200 whitespace-nowrap">
                5분 전
              </span>
            </div>
          </div>
          {receive_status === ShareStatus.PENDING && (
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

          {receive_status === ShareStatus.ACCEPTED && (
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
        </>
      )}
      {/* 보낸 요청 */}
    </div>
  );
}
