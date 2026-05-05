import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-[#6B2737] mb-4">
        Bienvenido a Cacao & Vainilla
      </h1>
      
      {!isAuthenticated && (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-[#6B2737] text-white px-8 py-3 rounded-lg text-lg hover:bg-[#5a1f2d] transition-colors"
        >
          Iniciar Sesión
        </button>
      )}
    </div>
  );
};

export default HomePage;