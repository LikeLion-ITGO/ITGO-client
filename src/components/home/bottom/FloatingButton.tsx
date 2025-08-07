import plusBtn from "@/assets/icons/home/plusBtn.svg";

export const FloatingButton = () => {
  return (
    <div
      className="w-[52px] h-[52px] bg-[#3CADFF] flex justify-center items-center rounded-[26px] mb-6 shadow-[0_2px_12px_0_rgba(60,173,255,0.4)]
"
    >
      <img src={plusBtn} alt="+" className="w-[18px] h-[18px]" />
    </div>
  );
};
