const ProvidersPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#6B2737]">Proveedores</h2>
          <p className="text-gray-500 text-sm">Directorio de proveedores</p>
        </div>
        <button className="bg-[#C8803C] text-white px-4 py-2 rounded-lg hover:bg-[#a6682e] transition-colors text-sm font-medium">
          + Agregar Proveedor
        </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <input
            type="text"
            placeholder="Buscar proveedor..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-[#6B2737]"
          />
          <button className="bg-[#6B2737] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5a1f2d]">
            Buscar
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#6B2737] text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Proveedor</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Correo</th>
              <th className="px-4 py-3 text-left">Dirección</th>
              <th className="px-4 py-3 text-center">Editar</th>
              <th className="px-4 py-3 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-400">
                No hay proveedores registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvidersPage;