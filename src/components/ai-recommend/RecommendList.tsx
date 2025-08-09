import { SentRequestCardItem } from "../manage/SentRequestCardItem";

export const RecommendList = () => {
  return (
    <div className="flex flex-col gap-4">
      <SentRequestCardItem />
      <SentRequestCardItem />
      <SentRequestCardItem />
      <SentRequestCardItem />
      <SentRequestCardItem />
    </div>
  );
};
