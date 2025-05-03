import Navbar from "@/components/Navbar";
import Search from "@/components/Search";

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-4 lg:p-20 lg:gap-12">
      <Navbar />
      <Search />
    </div>
  );
}
