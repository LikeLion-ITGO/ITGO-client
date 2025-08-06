import { SidebarProvider } from "../ui/sidebar";

export default function MainLayout({
  children,
  bgcolor = "#F5F7FA",
}: {
  children: React.ReactNode;
  bgcolor?: string;
}) {
  return (
    <div className={`h-100dvh flex flex-col px-[20px] bg-[${bgcolor}]`}>
      {children}
    </div>
  );
}
