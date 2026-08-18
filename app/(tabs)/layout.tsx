import TabBar from "@/components/tab_bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
      <nav>
        <TabBar />
      </nav>
    </div>
  );
}
