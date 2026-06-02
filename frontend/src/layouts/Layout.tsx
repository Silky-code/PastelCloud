import { Outlet, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Layout = () => {
  const { logout, isAuthenticated } = useAuth0();

  const navItems = [
    { path: "/pos", label: "Ventas" },
    { path: "/inventario", label: "Inventario" },
    { path: "/proveedores", label: "Proveedores" },
    { path: "/usuarios", label: "Usuarios" },
    { path: "/negocio", label: "Mi Negocio" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5ECD7]">
      {isAuthenticated && (
        <aside className="w-48 bg-[#6B2737] flex flex-col min-h-screen fixed top-0 left-0">
          <div className="flex flex-col items-center py-6 border-b border-[#5a1f2d]">
            <div className="w-16 h-16 rounded-full bg-[#C8803C] flex items-center justify-center text-white text-2xl font-bold mb-2">
              C
            </div>
            <span className="text-white text-sm font-semibold text-center px-2">
              Cacao & Vainilla POS
            </span>
          </div>
          <nav className="flex flex-col flex-1 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#C8803C] text-white"
                      : "text-[#f5d9c8] hover:bg-[#5a1f2d] hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="px-6 py-4 text-sm text-[#f5d9c8] hover:bg-[#5a1f2d] hover:text-white transition-colors text-left border-t border-[#5a1f2d]"
          >
            Cerrar Sesión
          </button>
        </aside>
      )}
      <main className={`flex-1 ${isAuthenticated ? "ml-48" : ""} min-h-screen flex flex-col`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;