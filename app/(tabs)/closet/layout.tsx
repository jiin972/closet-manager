export default function ClosetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2">
      <main>{children}</main>
    </div>
  );
}
