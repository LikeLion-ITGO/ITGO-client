import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import XIcon from "@/assets/icons/home/x-icon.svg?react";
import EditIcon from "@/assets/icons/home/edit-icon.svg?react";
import sample from "@/assets/images/sample.png";
import { Separator } from "@radix-ui/react-separator";

export const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar side="right">
      <SidebarHeader className="flex flex-row justify-between px-5 py-4">
        <button onClick={toggleSidebar}>
          <XIcon />
        </button>
        <EditIcon />
      </SidebarHeader>
      <SidebarContent className="flex flex-col p-5 gap-5">
        <SidebarGroup className="flex flex-row justify-between p-0">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold">여기 꼬치네</span>
            <div className="flex flex-col text-sm gap-[6px]">
              <span className="tracking--2">노원구 공릉동 99로</span>
              <span className="tracking--2">10:00 ~ 19:00</span>
            </div>
          </div>
          <img src={sample} alt="여기꼬치네" className="h-[78px] w-[78px]" />
        </SidebarGroup>
        <Separator className="h-[1px] w-full bg-[#F5F7FA]" />
        <SidebarGroup className="flex flex-row p-0 gap-10">
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-[#2695E8]">25</span>
            <span className="text-xs font-medium text-[#8F9498]">
              받은 요청
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-[#2695E8]">23</span>
            <span className="text-xs font-medium text-[#8F9498]">
              보낸 요청
            </span>
          </div>
        </SidebarGroup>
        <Separator className="h-[1px] w-full bg-[#F5F7FA]" />
        <SidebarGroup className="p-0">
          <div className="text-sm text-[#8F9498]">로그아웃</div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
