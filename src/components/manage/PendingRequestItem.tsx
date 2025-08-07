import { Button } from "../ui/button";

export const PendingRequestItem = () => {
  return (
    <div
      className="flex flex-row p-5 bg-white border border-gray-100 rounded-3xl gap-4"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex flex-row flex-1 justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-[6px]">
            <span className="subhead-02 text-gray-500">가게 이름</span>
            <span className="headline-01 text-gray-900">
              제발 저요 저 아니면 안돼요
            </span>
          </div>
          <span className="body-long-01 text-gray-500">
            나눔 요청 내용나눔 요청 내용나눔 요청 내용나눔 요청 내용나눔 요청
            내용나눔 요청 내용나눔 요청 내용나내용나내용나
          </span>
        </div>
        <div className="flex flex-col justify-between items-end">
          <span className="caption text-gray-200">5분전</span>
          <Button className="bg-white border border-blue-normal ml-3 text-blue-normal rounded-full">
            수락
          </Button>
        </div>
      </div>
    </div>
  );
};
