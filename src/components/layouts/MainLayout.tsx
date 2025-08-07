export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-100dvh flex flex-col px-[20px] bg-[#F5F7FA]">
      {children}
    </div>
  );
}
