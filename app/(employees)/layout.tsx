export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Employee-specific header or navigation can be added here */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
