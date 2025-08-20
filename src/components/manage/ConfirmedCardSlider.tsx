import { useEffect, useRef, useState } from "react";
import MailMilk from "@/assets/images/mail-milk.png";
import type { ShareItem } from "@/types/share";

export const ConfirmedCardSlider = ({
  shareItems = [],
  onActiveIndexChange,
}: {
  shareItems?: ShareItem[];
  onActiveIndexChange?: (index: number, share: ShareItem) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.round(el.scrollLeft / el.offsetWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
      onActiveIndexChange?.(index, shareItems[index]);
    }
  };

  useEffect(() => {
    if (shareItems.length > 0) {
      onActiveIndexChange?.(0, shareItems[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareItems.length]);

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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  return (
    <div className="w-full">
      {/* 카드 리스트 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth gap-4"
      >
        {shareItems?.map((share) => (
          <div
            key={share.shareId}
            className="min-w-full flex-shrink-0 snap-center "
          >
            <div
              className="flex flex-row p-5 bg-white border border-gray-100 rounded-3xl gap-4"
              style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
            >
              <img
                src={share.primaryImageUrl || MailMilk}
                alt={share.itemName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-row flex-1 justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-[6px]">
                    <span className="subhead-02 text-gray-700">
                      {share.brand}
                    </span>
                    <span className="headline-01 text-gray-900">
                      {share.itemName} {share.quantity}개
                    </span>
                  </div>
                  <span className="body-01 text-gray-500">
                    {formatDate(share.expirationDate)}까지
                  </span>
                </div>
                <span className="caption text-gray-200">
                  {getTimeAgo(share.regDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {shareItems?.length > 1 && (
        <>
          {/* 페이지네이션 */}
          <div className="flex justify-center gap-1 mt-3">
            {shareItems?.map((_, i) => (
              <span
                key={i}
                className={`h-[6px] rounded-full transition-all ${
                  currentIndex === i
                    ? "w-[10px] bg-blue-500"
                    : "w-[6px] bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
