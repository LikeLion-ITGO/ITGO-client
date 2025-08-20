import { RecommendList } from "@/components/ai-recommend/RecommendList";
import RegisterLayout from "@/components/layouts/RegisterLayout";
import { Button } from "@/components/ui/button";
// import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotFoundIcon from "@/assets/icons/ai-recommend/not-found-icon.svg?react";
import { ROUTES } from "@/constants/routes";
import type { WishMatchItem } from "@/types/wish";

export const AIRecommend = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { wishId?: number; matches?: WishMatchItem[] };
  };

  const matches = state?.matches ?? [];
  const isRecommended = matches.length > 0;

  return (
    <>
      {isRecommended ? (
        <RegisterLayout header="나눔 매칭" backgroundColor="bg-gray-100">
          <div className="flex flex-col mt-8 px-5 gap-8 mb-19">
            <div className="flex flex-col gap-[6px]">
              <span className="headline-02 text-gray-700">
                AI가 나와 맞는 나눔을
              </span>
              <span className="display-01 flex flex-row text-gray-900 gap-1">
                <span className="text-blue-dark">{matches.length}개</span>
                찾았어요
              </span>
            </div>
            <div className="flex flex-col mb-[23px]">
              {/* 추천 리스트 */}
              <RecommendList matches={matches} />
            </div>
          </div>
          <div className="fixed bottom-0 flex flex-row pt-3 pb-4 px-5 gap-2 bg-white">
            <Button
              className="subhead-03 flex-1 w-41 h-12 border bg-white border-blue-normal text-gray-900 hover:bg-gray-100 rounded-full"
              onClick={() => navigate("/")}
            >
              홈으로
            </Button>
            <Button
              className="subhead-03 flex-1 w-41 h-12 border bg-blue-normal border-blue-normal text-white hover:bg-blue-normal-hover rounded-full"
              onClick={() => navigate("/history/give")}
            >
              내역 보기
            </Button>
          </div>
        </RegisterLayout>
      ) : (
        <RegisterLayout header="나눔 매칭" backgroundColor="bg-white">
          <div className="flex flex-col items-center pt-[149px] px-5 bg-white">
            <div className="flex flex-col items-center gap-[6px]">
              <span className="headline-02 text-gray-700">
                AI가 나와 맞는 나눔을
              </span>
              <span className="display-01 text-blue-dark">
                아직 찾지 못했어요...
              </span>
            </div>
            <div className="mt-[18px] mb-8">
              <NotFoundIcon />
            </div>
            <Button
              className="subhead-03 w-[177px] h-12 bg-blue-light text-blue-darker hover:bg-blue-normal-hover rounded-full mb-50"
              onClick={() => {
                navigate(ROUTES.SHARELIST);
              }}
            >
              리스트에서 나눔 찾기
            </Button>
            <Button
              className="subhead-03 w-full h-12 bg-blue-normal text-white hover:bg-blue-normal-hover rounded-full mb-4"
              onClick={() => navigate("/")}
            >
              홈으로
            </Button>
          </div>
        </RegisterLayout>
      )}
    </>
  );
};
