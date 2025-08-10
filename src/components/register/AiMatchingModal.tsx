import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SearchIcon from "@/assets/icons/register/search-icon.svg?react";
import { X } from "lucide-react";

interface AIMatchingModalProps {
  open: boolean;
  onClose: () => void;
}

export const AIMatchingModal = ({ open, onClose }: AIMatchingModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[228px] h-[245px] rounded-[20px] pt-16 pb-7 bg-white [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">AI 매칭 중</DialogTitle>
        </DialogHeader>
        <div
          className="absolute flex items-center justify-center w-7 h-7 top-3 right-3 bg-gray-100 rounded-full"
          onClick={onClose}
        >
          <X size={17.5} />
        </div>
        <div className="flex flex-col items-center justify-center gap-7">
          <div className="flex flex-col items-center h-[74px] w-[74px]">
            <div className="orbit-container">
              <div className="orbiting">
                <SearchIcon />
              </div>
            </div>
          </div>
          <span className="subhead-long-03 text-center text-gray-900">
            AI가 나와 맞는 나눔을
            <br />
            찾고 있어요
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
