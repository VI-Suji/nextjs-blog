
import Navbar from "@/components/Navbar";
import HomePage from "../components/pages/HomePage";
import AboutPage from "../components/pages/AboutPage";
import { useState } from "react";

export default function Home() {
  const [selectedNav, setSelectedNav] = useState<string>('Home');
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-4 lg:p-20 lg:gap-12">
      <Navbar selectedNav={selectedNav} setSelectedNav={setSelectedNav}/>
      {selectedNav == 'Home' && <HomePage />}
      {selectedNav == 'About' && <AboutPage />}
    </div>
  );
}
