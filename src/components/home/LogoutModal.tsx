import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "@/apis/auth";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/stores/auth";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

export const LogoutModal = ({ open, onClose }: LogoutModalProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { setLogout } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("store-id-storage");
      localStorage.removeItem("user-storage");
      localStorage.removeItem("wish-id-storage");

      queryClient.clear();

      onClose();
      setLogout();
      navigate(ROUTES.HOME);
    },
    onError: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();

      onClose();
      navigate(ROUTES.HOME);
    },
  });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-[318px] rounded-[24px] pt-8 pb-5 gap-8 bg-white [&>button]:hidden">
        <div className="flex flex-col items-center gap-3">
          <Info size={24} className="text-red" />
          <span className="headline-long-02 text-gray-900">
            로그아웃 하시겠습니까?
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
              mutate();
              navigate(ROUTES.LOGIN);
            }}
          >
            로그아웃하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
