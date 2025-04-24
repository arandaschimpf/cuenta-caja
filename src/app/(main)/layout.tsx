import { Navbar } from "@/components/navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto">
      <main className="flex-1 content-area p-4">{children}</main>
      <Navbar />
    </div>
  );
}
