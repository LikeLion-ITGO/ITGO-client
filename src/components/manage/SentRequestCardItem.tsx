import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import MailMilk from "@/assets/images/mail-milk.png";
import { ReceiveShareStatus } from "@/constants/status";
import clsx from "clsx";

export const SentRequestCardItem = ({
  status,
}: {
  status?: ReceiveShareStatus;
}) => {
  const renderStatusText = () => {
    switch (status) {
      case ReceiveShareStatus.SHARING_CONFIRMED:
        return "거래 내역";
      default:
        return "요청 취소";
    }
  };

  return (
    <div
      className="flex flex-col p-5 bg-white border border-gray-100 rounded-3xl gap-6"
      style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex flex-row justify-between">
        <div className="w-full flex flex-row gap-4">
          <img
            src={MailMilk}
            alt="매일 우융"
            className="h-[90px] w-[90px] rounded-full"
          />
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-[6px]">
                <span className="subhead-02 text-gray-500">[브랜드]</span>
                <span className="headline-01 text-gray-900">제품명 수량</span>
              </div>
              <span className="caption text-gray-200">5분 전</span>
            </div>
            <div className="flex flex-col gap-2 body-01 text-gray-500">
              <div className="flex flex-row gap-2">
                <span>1km</span>
                <span className="w-[1px] h-[10px] bg-[#D9D9D9]"></span>
                <span className="flex flex-row items-center gap-1">
                  <Clock size={16} />
                  <span>00:00 ~ 00:00</span>
                </span>
              </div>
              <span>2025.05.23까지</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        className={clsx(
          "subhead-03 h-11 rounded-full border",
          status === ReceiveShareStatus.NO_REQUEST
            ? "bg-gray-50 border-gray-300 text-gray-300"
            : "bg-white border-blue-normal text-blue-normal"
        )}
      >
        {" "}
        {renderStatusText()}
      </Button>
    </div>
  );
};
