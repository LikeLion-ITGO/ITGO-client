import MainLayout from "@/components/layouts/MainLayout";
import backIcon from "@/assets/icons/back.svg";
import { ChevronDown } from "lucide-react";
import { ShareCategoryFilter } from "@/components/shareListPage/ShareCategoryFilter";
import { ShareProductList } from "@/components/shareListPage/ShareProductLIst";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShareListPage = () => {
  const [selectedCat, setSelectedCat] = useState("전체");
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="bg-[#F5F7FA]">
        <header className="relative w-full h-11 flex flex-row items-center justify-center py-[14px]">
          <img
            src={backIcon}
            alt="<"
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={() => navigate(-1)}
          />
          <div className="flex flex-row items-center text-xl font-semibold gap-[6px]">
            공릉 1동
            <ChevronDown />
          </div>
        </header>
        <ShareCategoryFilter
          catHandler={setSelectedCat}
          selectedCat={selectedCat}
        />
        <div className="flex mb-5 mt-8 gap-[6px] text-[14px] text-[#5F6165] font-semibold leading-[100%] tracking-[-0.4px] items-center">
          최신순
          <ChevronDown className="w-[10px]" />
        </div>
        <ShareProductList />
      </div>
    </MainLayout>
  );
};
