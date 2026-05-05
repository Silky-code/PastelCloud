import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header className="bg-[#6B2737] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Cacao & Vainilla POS
      </Link>
      <nav className="flex gap-4 items-center">
        {isAuthenticated && (
          <>
            <Link to="/pos" className="hover:text-[#C8803C] transition-colors">POS</Link>
            <Link to="/inventario" className="hover:text-[#C8803C] transition-colors">Inventario</Link>
            <Link to="/proveedores" className="hover:text-[#C8803C] transition-colors">Proveedores</Link>
            <Link to="/user-profile" className="hover:text-[#C8803C] transition-colors">Perfil</Link>
          </>
        )}
        {isAuthenticated ? (
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="bg-[#C8803C] px-4 py-2 rounded hover:bg-[#a6682e] transition-colors"
          >
            Cerrar Sesión
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-[#C8803C] px-4 py-2 rounded hover:bg-[#a6682e] transition-colors"
          >
            Iniciar Sesión
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;