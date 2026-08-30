import { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-[#090E14] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;