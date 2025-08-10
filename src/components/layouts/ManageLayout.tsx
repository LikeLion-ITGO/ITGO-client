import React from "react";
import clsx from "clsx";
import ChevronLeft from "@/assets/icons/manage/chevron-left.svg?react";
import CurvedBtn from "@/assets/icons/manage/curved-btn.svg?react";
import { useNavigate } from "react-router-dom";

interface ManageLayoutProps {
  children: React.ReactNode;
  title: string;
  category: string[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

export default function ManageLayout({
  children,
  title,
  category,
  selectedTab,
  setSelectedTab,
}: ManageLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] flex flex-col bg-blue-normal rounded-b-full">
      {/* 헤더 */}
      <header className="relative h-13 flex justify-center text-white text-xl font-semibold py-[14px] mx-5">
        <span
          className="absolute left-0"
          onClick={() => {
            navigate("/");
          }}
        >
          <ChevronLeft />
        </span>
        {title}
      </header>

      {/* 카테고리 탭 */}
      <div className="relative flex flex-row gap-2 pt-5 pb-2 px-5">
        {category.map((item, index) => (
          <>
            <button
              key={item}
              className={clsx(
                "relative headline-01 flex-1 transition-all duration-200",
                selectedTab === index
                  ? "text-white font-semibold pointer-tab"
                  : "text-blue-light-active"
              )}
              onClick={() => setSelectedTab(index)}
            >
              {item}
              {selectedTab === index && (
                <>
                  <div className="absolute w-2 h-2 left-1/2 -translate-x-1/2 top-[34px] bg-blue-normal rounded-full z-10"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[27px]">
                    <CurvedBtn />
                  </div>
                </>
              )}
            </button>
          </>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 bg-gray-100 rounded-xl mt-5">{children}</div>
    </div>
  );
}
