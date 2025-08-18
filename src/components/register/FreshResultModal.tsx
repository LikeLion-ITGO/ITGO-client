import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import FreshIcon from "@/assets/icons/register/fresh-icon.svg?react";
import HalfFreshIcon from "@/assets/icons/register/half-fresh-icon.svg?react";
import SpoiledIcon from "@/assets/icons/register/spoiled-icon.svg?react";
import clsx from "clsx";

type FreshResult = "FRESH" | "HALF_FRESH" | "SPOILED";
interface FreshResultModalProps {
  open: boolean;
  onClose: () => void;
  fresh_result: FreshResult;
}

const RESULT_MAP: Record<
  FreshResult,
  {
    label: string;
    lines: [string, string];
    colorClass: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
> = {
  FRESH: {
    label: "매우 신선함",
    lines: ["신선제품 인증이", "완료되었어요!"],
    colorClass: "text-[#34D12B]",
    Icon: FreshIcon,
  },
  HALF_FRESH: {
    label: "신선함",
    lines: ["신선제품 인증이", "완료되었어요!"],
    colorClass: "text-sub",
    Icon: HalfFreshIcon,
  },
  SPOILED: {
    label: "신선하지 않음",
    lines: ["신선제품 인증이 안된", "상품은 업로드가 불가해요."],
    colorClass: "text-red",
    Icon: SpoiledIcon,
  },
};

export const FreshResultModal = ({
  open,
  onClose,
  fresh_result,
}: FreshResultModalProps) => {
  const { label, lines, colorClass, Icon } = RESULT_MAP[fresh_result];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[229px] h-[276px] rounded-[24px] p-5 bg-white [&>button]:hidden">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <span className="flex items-center px-2 h-[26px] font-semibold text-xs tracking--2 bg-gray-100 text-gray-300 rounded-full">
              AI 판별 결과
            </span>
            <div
              className="flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full"
              onClick={onClose}
            >
              <X size={17.5} />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center">
              <span className="pb-1">
                <Icon />
              </span>
              <span className={clsx("subhead-03 mt-1", colorClass)}>
                {label}
              </span>
              <div className="subhead-long-03 flex flex-col items-center text-gray-900 pt-2">
                <span>{lines[0]}</span>
                <span>{lines[1]}</span>
              </div>
            </div>
            <Button className="subhead-03 h-12 bg-blue-normal text-white">
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
