import { useEffect, useState } from "react";

interface ShareCategoryFilterProps {
  selectedCat: string;
  catHandler: (category: string) => void;
}

export const ShareCategoryFilter = ({
  selectedCat,
  catHandler,
}: ShareCategoryFilterProps) => {
  const categories = ["전체", "유제품", "육류", "어류", "채소", "음식"];

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <div className="mt-6">
      <h4 className="text-[20px] font-semibold leading-none mb-4">
        재고 나눔 물품
      </h4>

      <div className="overflow-x-clip -mx-[20px]">
        <div
          className={`flex gap-2 no-scrollbar scrollbar-hide whitespace-nowrap  px-[20px] ${
            ready ? "overflow-x-auto" : "overflow-hidden"
          }`}
        >
          {categories.map((cat) => (
            <button
              className={`px-3 py-2 rounded-[48px] shrink-0  body-03 ${
                cat === selectedCat
                  ? "bg-[#3CADFF] text-[#fff]"
                  : "bg-[#fff] text-[#8F9498]"
              }`}
              type="button"
              onClick={() => catHandler(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
