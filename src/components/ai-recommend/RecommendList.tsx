import { SentRequestCardItem } from "../manage/SentRequestCardItem";

export const RecommendList = () => {
  return (
    <div className="flex flex-col gap-4">
      <SentRequestCardItem isRecommend={true} />
      <SentRequestCardItem isRecommend={true} />
      <SentRequestCardItem isRecommend={true} />
      <SentRequestCardItem isRecommend={true} />
      <SentRequestCardItem isRecommend={true} />
    </div>
  );
};
