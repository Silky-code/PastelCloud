import { useState } from "react";
import { useGetProducts } from "../api/ProductApi";
import { useCreateSale } from "../api/SaleApi";
import type { Product } from "../types";
import { toast } from "sonner";

type CartItem = {
  product: Product;
  quantity: number;
  subtotal: number;
};

const POSPage = () => {
  const { data: products, isLoading } = useGetProducts();
  const { mutate: createSale, isPending } = useCreateSale();

  const [cart, setCart]                   = useState<CartItem[]>([]);
  const [search, setSearch]               = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "tarjeta" | "otro">("efectivo");
  const [cashReceived, setCashReceived]   = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = ["Todos", ...Array.from(new Set(
    products?.map(p => p.category).filter(Boolean) as string[]
  ))];

  const filteredProducts = products?.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.barcode && p.barcode.includes(search));
    const matchCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    return matchSearch && matchCategory && p.active;
  });

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.product.salePrice }
            : item
        );
      }
      return [...prev, { product, quantity: 1, subtotal: product.salePrice }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(item =>
      item.product._id === productId
        ? { ...item, quantity: qty, subtotal: qty * item.product.salePrice }
        : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const change = cashReceived - total;

  const handleConfirm = () => {
    if (cart.length === 0) {
      toast.error("Agrega productos al carrito");
      return;
    }
    if (paymentMethod === "efectivo" && cashReceived < total) {
      toast.error("El pago recibido es menor al total");
      return;
    }

    createSale({
      details: cart.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      paymentMethod,
    }, {
      onSuccess: () => {
        setCart([]);
        setCashReceived(0);
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo - Carrito */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="bg-[#6B2737] text-white px-4 py-3 flex items-center justify-between">
          <span className="font-semibold">Venta actual</span>
          <button
            onClick={() => setCart([])}
            className="text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
          >
            Cancelar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              Sin productos
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product._id} className="border-b px-3 py-2">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-[#6B2737] flex-1">{item.product.name}</span>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-400 hover:text-red-600 text-xs ml-2"
                  >✕</button>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="w-6 h-6 bg-[#6B2737] text-white rounded text-xs hover:bg-[#5a1f2d]"
                    >-</button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="w-6 h-6 bg-[#6B2737] text-white rounded text-xs hover:bg-[#5a1f2d]"
                    >+</button>
                  </div>
                  <span className="text-sm font-semibold">${item.subtotal.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-3 bg-[#fdf8f0]">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">IVA:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-[#6B2737] mb-3 text-base border-t pt-2">
            <span>TOTAL:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value as any)}
            className="w-full border border-gray-200 rounded px-2 py-1 text-sm mb-2 focus:outline-none focus:border-[#6B2737]"
          >
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="otro">Otro</option>
          </select>

          {paymentMethod === "efectivo" && (
            <>
              <div className="flex gap-2 mb-1 items-center">
                <span className="text-sm text-gray-500 w-24">Pago recibido:</span>
                <input
                  type="number"
                  value={cashReceived || ""}
                  onChange={e => setCashReceived(Number(e.target.value))}
                  className="border border-gray-200 rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-[#6B2737]"
                  placeholder="$0.00"
                />
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Cambio:</span>
                <span className={change < 0 ? "text-red-500" : "text-green-600"}>
                  ${change >= 0 ? change.toFixed(2) : "0.00"}
                </span>
              </div>
            </>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleConfirm}
              disabled={isPending}
              className="flex-1 bg-[#C8803C] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#a6682e] disabled:opacity-50"
            >
              {isPending ? "Guardando..." : "Confirmar"}
            </button>
            <button
              onClick={() => setCart([])}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* Panel derecho - Productos */}
      <div className="flex-1 flex flex-col bg-[#F5ECD7]">
        <div className="bg-white border-b px-4 py-3 flex gap-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar producto / Escanear código de barras..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6B2737]"
          />
          <button className="bg-[#6B2737] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5a1f2d]">
            Buscar
          </button>
        </div>

        <div className="bg-white border-b px-4 py-2 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#C8803C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32 text-[#6B2737]">
              Cargando productos...
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="flex justify-center items-center h-32 text-gray-400">
              No se encontraron productos
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {filteredProducts?.map(product => (
                <button
                  key={product._id}
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className={`bg-white rounded-xl p-3 text-left shadow-sm hover:shadow-md transition-shadow border-2 ${
                    product.stock <= 0
                      ? "opacity-50 cursor-not-allowed border-gray-200"
                      : product.stock <= product.minStock
                      ? "border-red-300"
                      : "border-transparent hover:border-[#C8803C]"
                  }`}
                >
                  <div className="w-full h-16 rounded-lg mb-2 overflow-hidden bg-[#F5ECD7]">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                        📦
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#6B2737] truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category || "—"}</p>
                  <p className="text-sm font-bold text-[#C8803C] mt-1">${product.salePrice.toFixed(2)}</p>
                  {product.stock <= product.minStock && product.stock > 0 && (
                    <p className="text-xs text-red-500">Stock bajo</p>
                  )}
                  {product.stock <= 0 && (
                    <p className="text-xs text-red-500">Sin stock</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POSPage;