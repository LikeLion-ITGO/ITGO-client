import RegisterLayout from "@/components/layouts/RegisterLayout";
import { Separator } from "@radix-ui/react-separator";
import MailMilk from "@/assets/images/mail-milk.png";
import PresentSmall from "@/assets/icons/history/present-small.svg?react";
import HeartSmall from "@/assets/icons/history/heart-small.svg?react";
import ChevronRight from "@/assets/icons/history/chevron-right.svg?react";
import Phone from "@/assets/icons/history/phone.svg?react";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ShareCancelModal } from "@/components/history/ShareCancelModal";
import { toast } from "sonner";
import CheckCircle from "@/assets/icons/history/check-circle.svg?react";

export const HistoryDetail = () => {
  const [isMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCancelModalClick = () => {
    setModalOpen(true);
  };

  return (
    <RegisterLayout header={"나눔 내역 상세"}>
      <div className="flex flex-col pt-3 gap-6 mt-14">
        {/* 나눔 상태 */}
        <div className="w-fit headline-02 px-3 py-2 rounded-lg text-blue-normal-hover bg-blue-light mb-1 mx-5">
          나눔 매칭
        </div>

        <div className="flex flex-col px-5 gap-5">
          <span className="subhead-03 text-gray-800">나눔 물품</span>
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
              <div className="flex flex-col flex-1 justify-between">
                <div className="flex flex-col gap-[6px]">
                  <span className="subhead-02 text-gray-500">[브랜드]</span>
                  <span className="headline-01 text-gray-900">제품명 수량</span>
                </div>
                <div className="body-01 text-gray-500">2025.05.23까지</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="h-2 bg-gray-100" />
        <div className="flex flex-col px-5 gap-5">
          <span className="subhead-03 text-gray-800">나눔 매칭 정보</span>
          <div className="flex flex-col gap-3">
            {/* 나눔번호 */}
            <span className="flex flex-row gap-8 text-gray-500">
              <span className="text-sm font-semibold  tracking--2">
                나눔번호
              </span>
              <span className="body-01 gray-500">12345678</span>
            </span>
            {/* 매칭일시 */}
            <span className="flex flex-row gap-8 text-gray-500">
              <span className="text-sm font-semibold tracking--2">
                매칭일시
              </span>
              <span className="body-01 gray-500">2025.11.11(토) 10:11</span>
            </span>
            {/* 완료일시 */}
            <span className="flex flex-row gap-8 text-gray-500">
              <span className="text-sm font-semibold  tracking--2">
                완료일시
              </span>
              <span className="body-01">-</span>
            </span>
          </div>
        </div>
        <Separator className="h-2 bg-gray-100" />
        <div className="flex flex-col gap-2 px-5">
          <span className="flex flex-row gap-1 text-sm font-medium text-blue-normal tracking--2 leading-[21px]">
            <PresentSmall />
            나눔하는 가게
          </span>
          <div className="flex flex-col gap-2 pl-7">
            <span className="headline-01 flex flex-row items-center gap-2">
              스무 하루 <ChevronRight />
            </span>
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
                010-8634-0405
              </span>
            </div>
          </div>
        </div>
        <Separator className="h-2 bg-gray-100" />
        <div className="flex flex-col gap-2 px-5 pb-[65px] mb-19">
          <span className="flex flex-row gap-1 text-sm font-medium text-blue-normal tracking--2 leading-[21px]">
            <HeartSmall />
            나눔하는 가게
          </span>
          <div className="flex flex-col gap-2 pl-7">
            <span className="headline-01 flex flex-row items-center gap-2">
              스무 하루 <ChevronRight />
            </span>
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
                010-8634-0405
              </span>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full flex flex-row gap-[9px] pt-3 pb-4 px-5 border-t border-gray-100 bg-white">
          {isMe ? (
            <>
              <Button
                className="subhead-03 flex-1 h-12 text-blue-darker rounded-full bg-blue-light hover:bg-blue-light"
                onClick={handleCancelModalClick}
              >
                취소하기
              </Button>
            </>
          ) : (
            <>
              <Button
                className="subhead-03 flex-1 h-12 text-blue-darker rounded-full bg-blue-light hover:bg-blue-light"
                onClick={handleCancelModalClick}
              >
                취소하기
              </Button>
              <Button
                className="subhead-03 flex-1 h-12 text-white rounded-full bg-blue-normal hover:bg-blue-normal"
                onClick={() => {
                  toast("나눔이 완료되었습니다!", {
                    icon: <CheckCircle />,
                    unstyled: true,
                    classNames: {
                      toast:
                        "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
                      title: "subhead-03 text-white",
                    },
                  });
                }}
              >
                나눔 완료
              </Button>
            </>
          )}
        </div>
      </div>
      <ShareCancelModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </RegisterLayout>
  );
};
