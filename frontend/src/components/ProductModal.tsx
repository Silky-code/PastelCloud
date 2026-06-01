import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Product } from "../types";

const productSchema = z.object({
  name:          z.string().min(1, "El nombre es requerido"),
  barcode:       z.string().optional(),
  category:      z.string().optional(),
  purchasePrice: z.coerce.number().min(0, "Precio inválido"),
  salePrice:     z.coerce.number().min(0.01, "El precio de venta es requerido"),
  stock:         z.coerce.number().min(0, "Stock inválido"),
  minStock:      z.coerce.number().min(0, "Stock mínimo inválido"),
});

type ProductForm = z.infer<typeof productSchema>;
type ProductFormInput = z.input<typeof productSchema>;

type Props = {
  product?: Product;
  onClose: () => void;
  onSave: (data: ProductForm, imageFile?: File) => void;
  isLoading?: boolean;
};

const ProductModal = ({ product, onClose, onSave, isLoading }: Props) => {
  const [imagePreview, setImagePreview] = useState<string>(product?.imageUrl ?? "");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormInput, any, ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name:          product?.name          ?? "",
      barcode:       product?.barcode       ?? "",
      category:      product?.category      ?? "",
      purchasePrice: product?.purchasePrice ?? 0,
      salePrice:     product?.salePrice     ?? 0,
      stock:         product?.stock         ?? 0,
      minStock:      product?.minStock      ?? 5,
    }
  });

  useEffect(() => {
    setImagePreview(product?.imageUrl ?? "");
    setImageFile(undefined);
    reset({
      name:          product?.name          ?? "",
      barcode:       product?.barcode       ?? "",
      category:      product?.category      ?? "",
      purchasePrice: product?.purchasePrice ?? 0,
      salePrice:     product?.salePrice     ?? 0,
      stock:         product?.stock         ?? 0,
      minStock:      product?.minStock      ?? 5,
    });
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-[#6B2737] text-white px-5 py-4 rounded-t-xl flex justify-between items-center sticky top-0">
          <h3 className="font-semibold text-lg">
            {product ? "Editar Producto" : "Agregar Producto"}
          </h3>
          <button onClick={onClose} className="hover:text-gray-300 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit((data) => onSave(data, imageFile))} className="p-5 space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Nombre del producto *</label>
            <input
              {...register("name")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
              placeholder="Ej. Chocolate amargo"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Código de barras</label>
              <input
                {...register("barcode")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="Opcional"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Categoría</label>
              <input
                {...register("category")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="Ej. Ingredientes"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Precio de compra *</label>
              <input
                {...register("purchasePrice")}
                type="number" step="0.01"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="$0.00"
              />
              {errors.purchasePrice && <p className="text-red-500 text-xs mt-1">{errors.purchasePrice.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Precio de venta *</label>
              <input
                {...register("salePrice")}
                type="number" step="0.01"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="$0.00"
              />
              {errors.salePrice && <p className="text-red-500 text-xs mt-1">{errors.salePrice.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Stock actual *</label>
              <input
                {...register("stock")}
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="0"
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Stock mínimo *</label>
              <input
                {...register("minStock")}
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="5"
              />
              {errors.minStock && <p className="text-red-500 text-xs mt-1">{errors.minStock.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Imagen del producto</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-36 object-cover rounded-lg mt-1 mb-2 border border-gray-200"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 mt-1 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#C8803C] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#a6682e] disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;