import { useState } from "react";
import { useGetProviders, useCreateProvider, useUpdateProvider, useDeleteProvider } from "../api/ProviderApi";
import ProviderModal from "../components/ProviderModal";
import type { Provider } from "../types";

const ProvidersPage = () => {
  const { data: providers, isLoading } = useGetProviders();
  const { mutate: createProvider, isPending: isCreating } = useCreateProvider();
  const { mutate: updateProvider, isPending: isUpdating } = useUpdateProvider();
  const { mutate: deleteProvider } = useDeleteProvider();

  const [showModal, setShowModal]         = useState(false);
  const [editProvider, setEditProvider]   = useState<Provider | undefined>(undefined);
  const [search, setSearch]               = useState("");

  const filtered = providers?.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: any) => {
    if (editProvider) {
      updateProvider({ id: editProvider._id, ...data }, {
        onSuccess: () => { setShowModal(false); setEditProvider(undefined); }
      });
    } else {
      createProvider(data, {
        onSuccess: () => setShowModal(false)
      });
    }
  };

  const handleEdit = (provider: Provider) => {
    setEditProvider(provider);
    setShowModal(true);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen text-[#6B2737]">
      Cargando proveedores...
    </div>
  );

  return (
    <div className="p-6">
      {showModal && (
        <ProviderModal
          provider={editProvider}
          onClose={() => { setShowModal(false); setEditProvider(undefined); }}
          onSave={handleSave}
          isLoading={isCreating || isUpdating}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#6B2737]">Proveedores</h2>
          <p className="text-gray-500 text-sm">Directorio de proveedores</p>
        </div>
        <button
          onClick={() => { setEditProvider(undefined); setShowModal(true); }}
          className="bg-[#C8803C] text-white px-4 py-2 rounded-lg hover:bg-[#a6682e] text-sm font-medium"
        >
          + Agregar Proveedor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar proveedor..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-[#6B2737]"
          />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#6B2737] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Proveedor</th>
              <th className="px-4 py-3 text-left">Contacto</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Correo</th>
              <th className="px-4 py-3 text-left">Dirección</th>
              <th className="px-4 py-3 text-center">Editar</th>
              <th className="px-4 py-3 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filtered?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No hay proveedores registrados
                </td>
              </tr>
            )}
            {filtered?.map((provider, index) => (
              <tr key={provider._id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-[#fdf8f0]"}`}>
                <td className="px-4 py-3 font-medium text-[#6B2737]">{provider.name}</td>
                <td className="px-4 py-3 text-gray-500">{provider.contact || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{provider.phone || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{provider.email || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{provider.address || "—"}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleEdit(provider)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => deleteProvider(provider._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvidersPage;