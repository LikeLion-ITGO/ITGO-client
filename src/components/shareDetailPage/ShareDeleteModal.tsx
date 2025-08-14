import { Button } from "../ui/button";
import infoIcon from "@/assets/icons/ShareListPage/info.svg";

interface ShareDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export const ShareDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: ShareDeleteModalProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-[24px] w-[318px] h-[246px] px-[20px] pb-[20px] pt-[32px] flex flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-3">
          <img src={infoIcon} alt="info" />
          <div className="flex flex-col text-center gap-2 font-[Pretendard]">
            <h3 className="text-lg font-semibold mb-6 headline-long-02 text-[#171818] mb-[0]">
              나눔을 삭제하시겠습니까?
            </h3>
            <p className=" text-[#8F9498] font-medium leading-[150%] tracking-[-0.4px] text-[14px]">
              한 번 삭제한 나눔은 복구가 되지 않습니다
              <br />
              신중하게 선택해주세요.
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full h-[48px] subhead-03">
          <Button
            onClick={onClose}
            className="rounded-[12px] flex-1 h-[48px] bg-[#DDF0FF] text-[#0C3756] font-semibold text-[16px]"
          >
            아니오
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-[12px] flex-1 h-[48px] bg-[#3CADFF] text-white font-semibold text-[16px]"
          >
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
};
