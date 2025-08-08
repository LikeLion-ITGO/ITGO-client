import { useRef, useState } from "react";
import MailMilk from "@/assets/images/mail-milk.png";

const confirmedCards = [
  {
    id: 1,
    brand: "매일",
    name: "오리지널우유1L 2팩",
    date: "2025.05.23까지",
    timeAgo: "5분 전",
    image: MailMilk,
  },
  {
    id: 2,
    brand: "매일",
    name: "오리지널우유1L 2팩",
    date: "2025.05.23까지",
    timeAgo: "5분 전",
    image: MailMilk,
  },
  {
    id: 3,
    brand: "매일",
    name: "오리지널우유1L 2팩",
    date: "2025.05.23까지",
    timeAgo: "5분 전",
    image: MailMilk,
  },
];

export const ConfirmedCardSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      {/* 카드 리스트 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth gap-4"
      >
        {confirmedCards.map((card) => (
          <div key={card.id} className="min-w-full flex-shrink-0 snap-center ">
            <div
              className="flex flex-row p-5 bg-white border border-gray-100 rounded-3xl gap-4"
              style={{ boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)" }}
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-row flex-1 justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-[6px]">
                    <span className="subhead-02 text-gray-700">
                      {card.brand}
                    </span>
                    <span className="headline-01 text-gray-900">
                      {card.name}
                    </span>
                  </div>
                  <span className="body-01 text-gray-500">{card.date}</span>
                </div>
                <span className="caption text-gray-200">{card.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {confirmedCards.length > 1 && (
        <>
          {/* 페이지네이션 */}
          <div className="flex justify-center gap-1 mt-3">
            {confirmedCards.map((_, i) => (
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
