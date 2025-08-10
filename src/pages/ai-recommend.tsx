import { RecommendList } from "@/components/ai-recommend/RecommendList";
import RegisterLayout from "@/components/layouts/RegisterLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AIRecommend = () => {
  const navigate = useNavigate();

  return (
    <RegisterLayout header="나눔 매칭" backgroundColor="bg-gray-100">
      <div className="flex flex-col mt-8 px-5 gap-8">
        <div className="flex flex-col gap-[6px]">
          <span className="headline-02 text-gray-700">
            AI가 나와 맞는 나눔을
          </span>
          <span className="display-01 flex flex-row text-gray-900 gap-1">
            <span className="text-blue-dark">5개</span> 찾았어요
          </span>
        </div>
        <div className="flex flex-col mb-[23px]">
          {/* 추천 리스트 */}
          <RecommendList />
        </div>
      </div>
      <div className="flex flex-row pt-3 pb-4 px-5 gap-2 bg-white">
        <Button
          className="subhead-03 flex-1 w-41 h-12 border bg-white border-blue-normal text-gray-900 hover:bg-gray-100 rounded-full"
          onClick={() => navigate("/")}
        >
          홈으로
        </Button>
        <Button
          className="subhead-03 flex-1 w-41 h-12 border bg-blue-normal border-blue-normal text-white hover:bg-blue-normal-hover rounded-full"
          onClick={() => navigate("/history")}
        >
          내역 보기
        </Button>
      </div>
    </RegisterLayout>
  );
};
