const ProvidersPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#6B2737]">Proveedores</h2>
        <button className="bg-[#6B2737] text-white px-4 py-2 rounded hover:bg-[#5a1f2d]">
          + Agregar Proveedor
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-6 text-gray-500 text-center">
        No hay proveedores registrados aún.
      </div>
    </div>
  );
};

export default ProvidersPage;