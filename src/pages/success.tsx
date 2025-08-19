import { Clock, MapPin } from "lucide-react";
import MailMilk from "@/assets/images/mail-milk.png";
import SampleStore from "@/assets/images/sampleStore.png";
import ChevronLeft from "@/assets/icons/manage/chevron-left.svg?react";
import Firework from "@/assets/icons/success/firework.svg?react";
import ThankYouBubbleReqSender from "@/assets/icons/success/thank-you-bubble-req-sender.svg?react";
import ThankYouBubbleReqReceiver from "@/assets/icons/success/thank-you-bubble-req-receiver.svg?react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";

export const Success = () => {
  const navigate = useNavigate();
  const [isMe] = useState(false);

  return (
    <div className="flex flex-col px-5 gap-10">
      {/* 헤더 */}
      <header className="text-gray-900 py-[14px]">
        <ChevronLeft
          onClick={() => {
            navigate(-1);
          }}
        />
      </header>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-5">
          <Firework />
          {isMe ? (
            <div className="flex flex-col gap-[7px]">
              <span className="display-01 text-gray-900">
                나눔이 성사되었어요!
              </span>
              <div className="body-long-02 flex flex-col justify-center text-gray-700">
                <span>가게 운영시간에 맞춰 잇고님이 방문할 예정입니다</span>
                <span>물품을 미리 준비해주세요</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[7px]">
              <span className="display-01 text-gray-900">
                나눔 요청이 수락되었어요!
              </span>
              <div className="body-long-02 flex flex-col justify-center text-gray-700">
                <span>가게 운영시간에 맞춰 스무 하루로</span>
                <span>방문해주세요</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex justify-center">
              {isMe ? (
                <ThankYouBubbleReqReceiver />
              ) : (
                <ThankYouBubbleReqSender />
              )}
            </div>
            {/* 상품 정보 */}
            <div
              className="flex flex-row bg-white rounded-3xl border border-gray-100 py-3 px-5 gap-4"
              style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="flex flex-row gap-4">
                <img
                  src={MailMilk}
                  alt="매일 우유"
                  className="h-16 w-16 rounded-full"
                />
                <div className="flex flex-col justify-center gap-[6px]">
                  <div className="subhead-02 text-gray-700">매일</div>
                  <div className="headline-01 text-gray-900">
                    오리지널우유1L 2팩
                  </div>
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
                    <Clock size={16} />
                    010-9634-0405
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={SampleStore}
                  alt="스무 하루"
                  className="h-[78px] w-[78px] rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 section */}
      <div className="flex flex-row gap-[9px] mt-6 mb-3">
        <Button
          className="h-12 subhead-03 flex-1 text-blue-darker bg-blue-light rounded-full"
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </Button>
        <Button
          className="h-12 subhead-03 flex-1 text-blue-darker bg-blue-light rounded-full"
          onClick={() => {
            navigate(ROUTES.HISTORY);
          }}
        >
          나눔 내역 상세
        </Button>
      </div>
    </div>
  );
};
