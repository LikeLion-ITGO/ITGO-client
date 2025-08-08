import ChevronLeft from "@/assets/icons/manage/chevron-left.svg?react";

interface RegisterLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  backgroundColor?: string;
}

export default function RegisterLayout({
  children,
  header,
  backgroundColor = "bg-white",
}: RegisterLayoutProps) {
  return (
    <div className={`h-100dvh flex flex-col ${backgroundColor}`}>
      <header className="relative flex text-xl font-semibold justify-center mx-5 py-[14px] text-gray-900">
        <div className="absolute left-0">
          <ChevronLeft />
        </div>
        {header}
      </header>
      <main>{children}</main>
    </div>
  );
}
