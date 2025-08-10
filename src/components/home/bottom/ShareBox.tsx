import shareIcon from "../../../assets/icons/home/shareBtn.svg";

export const ShareBox = () => {
  return (
    <div className="rounded-[24px] border border-[#F5F7FA] bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.05)] mb-10 p-[20px] justify-between flex flex-row h-[133px]">
      <div>
        <h4 className="headline-01 mb-3">잇고 공유하기</h4>
        <div className="text-[#47484B] text-[14px] font-medium leading-[150%] tracking-[-0.4px]">
          {`잇고가 마음에 드셨다면,`}
          <br />
          {`주변 사장님들께도 소개해 주세요!`}
          <br />
          {`함께 쓰면 더 편해져요 :)`}
        </div>
      </div>
      <div className="w-[48px] h-[48px] bg-[#D5EDFF] flex items-center justify-center  rounded-[76px] shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]">
        <img
          src={shareIcon}
          alt="share"
          className="pd-[12px] w-[24px] h-[24px] "
        />
      </div>
    </div>
  );
};
