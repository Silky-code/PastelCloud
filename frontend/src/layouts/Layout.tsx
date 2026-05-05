import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#F5ECD7] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-[#6B2737] text-white text-center py-3 text-sm">
        © 2026 PastelCloud — Cacao & Vainilla
      </footer>
    </div>
  );
};

export default Layout;