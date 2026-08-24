import TabBar from "@/components/tab_bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
      <main className="flex-1 pb-16">{children}</main>
      <nav>
        <TabBar />
      </nav>
    </div>
  );
}
