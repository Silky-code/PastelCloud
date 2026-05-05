import { useGetProducts, useDeleteProduct } from "../api/ProductApi";

const InventoryPage = () => {
  const { data: products, isLoading } = useGetProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-[#6B2737]">Cargando inventario...</p>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#6B2737]">Inventario</h2>
          <p className="text-gray-500 text-sm">Gestión de los productos</p>
        </div>
        <button className="bg-[#C8803C] text-white px-4 py-2 rounded-lg hover:bg-[#a6682e] transition-colors text-sm font-medium">
          + Agregar Producto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:border-[#6B2737]"
          />
          <button className="bg-[#6B2737] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5a1f2d]">
            Buscar
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#6B2737] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Código</th>
              <th className="px-4 py-3 text-left">Producto</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-center">Editar</th>
              <th className="px-4 py-3 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No hay productos registrados
                </td>
              </tr>
            )}
            {products?.map((product, index) => (
              <tr
                key={product._id}
                className={`border-b ${
                  product.stock <= product.minStock ? "bg-red-50" : 
                  index % 2 === 0 ? "bg-white" : "bg-[#fdf8f0]"
                }`}
              >
                <td className="px-4 py-3 text-gray-500">{product.barcode || "—"}</td>
                <td className="px-4 py-3 font-medium text-[#6B2737]">{product.name}</td>
                <td className="px-4 py-3 text-gray-500">{product.category || "—"}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    product.stock <= product.minStock
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {product.stock} {product.stock <= product.minStock && "⚠"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">${product.salePrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                    Editar
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => deleteProduct(product._id)}
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

export default InventoryPage;