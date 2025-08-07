export const ShareCategoryFilter = () => {
  const categories = ["전체", "유제품", "육류", "어류", "채소", "음식"];

  return (
    <div className="mt-6">
      <h4 className="text-[20px] font-semibold leading-none mb-4">
        재고 나눔 물품
      </h4>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap -mx-[20px] px-[20px]">
        {categories.map((cat) => (
          <button
            className={`px-3 py-2 rounded-[48px] shrink-0  body-03 bg-[#fff] text-[#8F9498]`}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
