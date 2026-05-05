import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5ECD7]">
      <div className="bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center gap-6 max-w-sm w-full">
        <div className="w-24 h-24 rounded-full bg-[#6B2737] flex items-center justify-center text-white text-4xl font-bold">
          C
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#6B2737]">Cacao & Vainilla</h1>
          <p className="text-gray-500 text-sm mt-1">Sistema de Punto de Venta</p>
        </div>
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-[#6B2737] text-white py-3 rounded-lg font-medium hover:bg-[#5a1f2d] transition-colors"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default HomePage;