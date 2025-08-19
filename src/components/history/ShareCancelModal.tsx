import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import CheckCircle from "@/assets/icons/history/check-circle.svg?react";

interface ShareCancelModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShareCancelModal = ({ open, onClose }: ShareCancelModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-[318px] rounded-[24px] pt-8 pb-5 gap-8 bg-white [&>button]:hidden">
        <div className="flex flex-col items-center gap-3">
          <Info size={24} className="text-red" />
          <span className="headline-long-02 text-gray-900">
            나눔을 취소하시겠습니까?
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            className="h-12 flex-1 subhead-03 text-blue-darker rounded-xl bg-blue-light hover:bg-blue-light"
            onClick={onClose}
          >
            아니오
          </Button>
          <Button
            className="h-12 flex-1 subhead-03 text-white rounded-xl bg-blue-normal hover:bg-blue-normal"
            onClick={() => {
              toast("나눔이 취소되었습니다!", {
                icon: <CheckCircle />,
                unstyled: true,
                classNames: {
                  toast:
                    "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
                  title: "subhead-03 text-white",
                },
              });
            }}
          >
            취소하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
