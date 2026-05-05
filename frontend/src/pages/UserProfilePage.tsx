import { useGetCurrentUser } from "../api/userApi";

const UserProfilePage = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (isLoading) return <div>Cargando perfil...</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-[#6B2737] mb-2">Perfil del Usuario</h2>
      <p className="text-gray-500 mb-6">Información de tu cuenta</p>
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Nombre:</span> {currentUser?.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {currentUser?.email}
        </div>
        <div>
          <span className="font-semibold">Rol:</span>{" "}
          <span className={`px-2 py-1 rounded text-sm ${
            currentUser?.role === "admin"
              ? "bg-[#6B2737] text-white"
              : "bg-[#C8803C] text-white"
          }`}>
            {currentUser?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;