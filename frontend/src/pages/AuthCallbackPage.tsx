import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../api/userApi";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const { mutateAsync: createUser } = useCreateUser();
  const hasCreated = useRef(false);

  useEffect(() => {
    const createAndRedirect = async () => {
      console.log("AuthCallback ejecutado, user:", user);
      if (user && !hasCreated.current) {
        hasCreated.current = true;
        try {
          const token = await getAccessTokenSilently();
          console.log("Token obtenido:", token ? "OK" : "FALLÓ");
          const result = await createUser({ 
            email: user.email!, 
            name: user.name ?? user.email! 
          });
          console.log("Usuario creado:", result);
        } catch (error) {
          console.error("Error detallado:", error);
        } finally {
          navigate("/");
        }
      }
    };
    createAndRedirect();
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="text-xl text-[#6B2737] font-semibold">Iniciando sesión...</div>
    </div>
  );
};

export default AuthCallbackPage;