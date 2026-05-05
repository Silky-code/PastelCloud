import { useGetProducts } from "../api/productApi";

const InventoryPage = () => {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <div>Cargando inventario...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#6B2737]">Inventario</h2>
        <button className="bg-[#6B2737] text-white px-4 py-2 rounded hover:bg-[#5a1f2d]">
          + Agregar Producto
        </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#6B2737] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-right">Precio Venta</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className={`border-b ${
                product.stock <= product.minStock ? "bg-red-50" : ""
              }`}>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-gray-500">{product.category || "—"}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    product.stock <= product.minStock
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {product.stock}
                    {product.stock <= product.minStock && " ⚠️"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">${product.salePrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-center flex gap-2 justify-center">
                  <button className="text-blue-600 hover:underline text-xs">Editar</button>
                  <button className="text-red-600 hover:underline text-xs">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;