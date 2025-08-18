import MailMilk from "@/assets/images/mail-milk.png";
import { ProductStatus } from "@/constants/status";
import { Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import Phone from "@/assets/icons/history/phone.svg?react";

interface HistoryContentProps {
  status: ProductStatus;
  isReceived?: boolean;
}

export const HistoryContent = ({ status, isReceived }: HistoryContentProps) => {
  const renderStatusText = () => {
    switch (status) {
      case ProductStatus.CONFIRMED:
        return "나눔 완료";
      default:
        return "나눔 매칭";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <span className="body-01 text-gray-500">2025.11.11</span>
        <span
          className={`subhead-03 ${
            status === ProductStatus.CONFIRMED
              ? "text-gray-500"
              : "text-blue-normal-hover"
          }`}
        >
          {renderStatusText()}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className="flex flex-row bg-white rounded-3xl border border-gray-100 p-5 gap-4"
          style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
        >
          <img
            src={MailMilk}
            alt="매일 우유"
            className="h-[90px] w-[90px] rounded-full"
          />
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-[6px]">
                <span className="subhead-02 text-gray-500">[브랜드]</span>
                <span className="headline-01 text-gray-900">제품명 수량</span>
              </div>
              <div className="caption text-gray-200">5분 전</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="body-01 text-gray-500 flex flex-row items-center gap-2">
                <span>1km</span>
                <span className="w-[1px] h-[10px] bg-[#D9D9D9]"></span>
                <span className="flex flex-row items-center gap-1">
                  <Clock size={16} />
                  <span>00:00 ~ 00:00</span>
                </span>
              </div>
              <div className="body-01 text-gray-500">2025.05.23까지</div>
            </div>
          </div>
        </div>

        {/* 가게 정보 */}
        <div
          className="flex flex-row bg-white rounded-3xl border border-gray-100 pl-6 pr-[27px] py-7 gap-4"
          style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="flex flex-col flex-1 gap-4">
            <div className="headline-01 text-gray-900">스무 하루</div>
            <div className="flex flex-col body-01 gap-[6px] text-gray-600">
              <span className="flex flex-row items-center gap-[6px]">
                <MapPin size={16} />
                노원구 공릉동 99로
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Clock size={16} />
                10:00 ~ 19:00
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Phone />
                010-9634-0405
              </span>
            </div>
          </div>
          <img
            src={MailMilk}
            alt="매일 우유"
            className="h-[90px] w-[90px] rounded-full"
          />
        </div>
      </div>

      {isReceived && status === ProductStatus.MATCHED && (
        <Button className="subhead-03 w-full h-12 text-white bg-blue-normal hover:bg-blue-normal-hover rounded-full">
          나눔 완료
        </Button>
      )}
    </div>
  );
};
