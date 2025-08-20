import type { WishMatchItem } from "@/types/wish";
import { SentRequestCardItem } from "../manage/SentRequestCardItem";
import { formatLocalTime } from "@/types/time";

export const RecommendList = ({ matches }: { matches: WishMatchItem[] }) => {
  if (!matches || matches.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      {matches.map((m) => (
        <SentRequestCardItem
          key={m.shareId}
          isRecommend={true}
          brand={m.brand}
          itemName={m.itemName}
          quantity={m.quantity}
          minutesAgo={m.minutesAgo}
          distanceKm={m.distanceKm}
          openTime={
            typeof m.openTime === "string"
              ? formatLocalTime(m.openTime)
              : m.openTime
          }
          closeTime={
            typeof m.closeTime === "string"
              ? formatLocalTime(m.closeTime)
              : m.closeTime
          }
          expirationDate={m.expirationDate}
          primaryImageUrl={m.primaryImageUrl}
        />
      ))}
    </div>
  );
};
