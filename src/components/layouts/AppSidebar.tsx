import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import ChevronRight from "@/assets/icons/home/chevron-right.svg?react";
import XIcon from "@/assets/icons/home/x-icon.svg?react";
import EditIcon from "@/assets/icons/home/edit-icon.svg?react";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Clock, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMyStore } from "@/apis/store";
import type { Store } from "@/types/store";

import { useEffect, useState } from "react";
import { LogoutModal } from "../home/LogoutModal";
import { useStoreIdStore } from "@/stores/store";
import { useWishInfinite } from "@/hooks/useWishInfinite";
import { useShareInfinite } from "@/hooks/useShareInfinite";

export const AppSidebar = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);

  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { data: store, isLoading } = useQuery<Store>({
    queryKey: ["myStore"],
    queryFn: getMyStore,
  });
  const setStoreId = useStoreIdStore((s) => s.setStoreId);

  useEffect(() => {
    if (isLoading) return;
    if (store?.storeId) {
      setStoreId(store.storeId);
    }
  }, [isLoading, store?.storeId, setStoreId]);

  // wish 목록 조회
  const {
    data: wish,
    isLoading: isWishLoading,
    isError: isWishError,
  } = useWishInfinite(1);
  const wishItems = wish?.flat ?? [];
  // share 목록 조회
  const {
    data: share,
    isLoading: isShareLoading,
    isError: isShareError,
  } = useShareInfinite(20);
  const shareItems = share?.flat ?? [];

  if (isWishLoading) return <div className="p-4">불러오는 중…</div>;
  if (isWishError) return <div className="p-4">목록을 불러오지 못했어요.</div>;

  if (isShareLoading) return <div className="p-4">불러오는 중…</div>;
  if (isShareError) return <div className="p-4">목록을 불러오지 못했어요.</div>;

  const receivedCount = (shareItems ?? []).reduce(
    (sum, s) => sum + (s.claimTotalCount ?? 0),
    0
  );
  const sentCount = (wishItems ?? []).reduce(
    (sum, w) => sum + (w.claimTotalCount ?? 0),
    0
  );
  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  return (
    <Sidebar side="right">
      <SidebarHeader className="flex flex-row justify-between px-5 py-4">
        <button onClick={toggleSidebar}>
          <XIcon />
        </button>
        <EditIcon onClick={() => navigate(ROUTES.MY_INFO)} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col p-5 gap-5">
        <SidebarGroup className="flex flex-row justify-between p-0">
          <div className="flex flex-col gap-4">
            <span className="h-6 flex items-center text-xl font-semibold text-gray-900">
              {store?.storeName}
            </span>
            <div className="flex flex-col text-sm gap-[6px] text-gray-600">
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <MapPin size={16} className="w-[16px] h-[16px] " />
                <span className="text-sm whitespace-pre-line">
                  {(store?.address?.roadAddress ?? "").replace(/\s*\(.*/, "")}
                </span>
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Clock size={16} />
                {store?.openTime?.slice(0, 5)} ~ {store?.closeTime?.slice(0, 5)}
              </span>
            </div>
          </div>
          <img
            src={store?.storeImageUrl}
            alt="여기꼬치네"
            className="h-[78px] w-[78px] rounded-full object-cover"
          />
        </SidebarGroup>
        <Separator className="h-[1px] w-full bg-[#F5F7FA]" />
        <SidebarGroup className="flex flex-col p-0 gap-2">
          <span
            className="flex flex-row items-center text-sm tracking--2 text-gray-400 gap-2"
            onClick={() => {
              navigate("/manage/receive");
            }}
          >
            나눔 현황 <ChevronRight />
          </span>
          <div className="flex flex-row gap-10">
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-[#2695E8]">
                {receivedCount}
              </span>
              <span className="text-xs font-medium text-[#8F9498]">
                받은 요청
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-[#2695E8]">
                {sentCount}
              </span>
              <span className="text-xs font-medium text-[#8F9498]">
                보낸 요청
              </span>
            </div>
          </div>
        </SidebarGroup>
        <Separator className="h-[1px] w-full bg-[#F5F7FA]" />
        <SidebarGroup className="p-0">
          <div className="flex flex-col gap-5">
            <div
              className="h-[17px] flex items-center text-sm text-[#8F9498]"
              onClick={() => {
                navigate("/history/give");
              }}
            >
              거래 내역
            </div>
            <div
              className="h-[17px] flex items-center text-sm text-[#8F9498]"
              onClick={handleLogoutClick}
            >
              로그아웃
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </Sidebar>
  );
};
