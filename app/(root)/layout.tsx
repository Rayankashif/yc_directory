import Navbar from "../../components/Navbar";
import ReportBugButton from "@/components/ReportBugButton";
export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
        <ReportBugButton />
    </main>
  );
}
