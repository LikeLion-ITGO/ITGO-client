import MainLayout from "@/components/layouts/MainLayout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/AppSidebar";
import ChevronDown from "@/assets/icons/home/chevron-down.svg?react";
import { ShareStatusContent } from "@/components/home/ShareStatusContent";

export default function Home() {
  return (
    <MainLayout>
      <AppSidebar />
      <div className="w-full flex flex-col">
        <header className="h-11 flex flex-row items-center justify-between py-[14px]">
          <div className="flex flex-row items-center text-xl font-semibold gap-[6px]">
            공릉 1동
            <ChevronDown />
          </div>
          <SidebarTrigger />
        </header>
        <ShareStatusContent />
      </div>
    </MainLayout>
  );
}
