import { useGetCurrentUser } from "../api/userApi";

const UsersPage = () => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#6B2737]">Usuarios</h2>
          <p className="text-gray-500 text-sm">Gestión de usuarios del sistema</p>
        </div>
        {currentUser?.role === "admin" && (
          <button className="bg-[#C8803C] text-white px-4 py-2 rounded-lg hover:bg-[#a6682e] transition-colors text-sm font-medium">
            + Agregar Usuario
          </button>
        )}
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#6B2737] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-left">Rol</th>
              <th className="px-4 py-3 text-center">Estado</th>
              <th className="px-4 py-3 text-center">Editar</th>
              <th className="px-4 py-3 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {currentUser && (
              <tr className="border-b bg-white">
                <td className="px-4 py-3 font-medium text-[#6B2737]">{currentUser.name}</td>
                <td className="px-4 py-3 text-gray-500">{currentUser.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    currentUser.role === "admin"
                      ? "bg-[#6B2737] text-white"
                      : "bg-[#C8803C] text-white"
                  }`}>
                    {currentUser.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                    Activo
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                    Editar
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                    Eliminar
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;