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
import sample from "@/assets/images/sample.png";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Clock, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMyStore } from "@/apis/store";
import type { Store } from "@/types/store";

import { useState } from "react";
import { LogoutModal } from "../home/LogoutModal";

export const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { data: store } = useQuery<Store>({
    queryKey: ["myStore"],
    queryFn: getMyStore,
  });

  const [logoutOpen, setLogoutOpen] = useState(false);

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
              {store?.name}
            </span>
            <div className="flex flex-col text-sm gap-[6px] text-gray-600">
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <MapPin size={16} />
                {store?.address.roadAddress}
              </span>
              <span className="flex flex-row items-center tracking--2 gap-[6px]">
                <Clock size={16} />
                {store?.openTime} ~ {store?.closeTime}
              </span>
            </div>
          </div>
          <img src={sample} alt="여기꼬치네" className="h-[78px] w-[78px]" />
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
              <span className="text-xl font-semibold text-[#2695E8]">0</span>
              <span className="text-xs font-medium text-[#8F9498]">
                받은 요청
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-[#2695E8]">4</span>
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
