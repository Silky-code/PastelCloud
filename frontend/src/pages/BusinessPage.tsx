import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetBusiness, useUpdateBusiness } from "../api/BusinessApi";

type BusinessForm = {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
};

const BusinessPage = () => {
  const { data: business, isLoading } = useGetBusiness();
  const { mutate: updateBusiness, isPending } = useUpdateBusiness();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const { register, handleSubmit, reset } = useForm<BusinessForm>();

  useEffect(() => {
    if (business) {
      reset({
        name:        business.name        ?? "",
        description: business.description ?? "",
        address:     business.address     ?? "",
        phone:       business.phone       ?? "",
        email:       business.email       ?? "",
      });
      setImagePreview(business.imageUrl ?? "");
    }
  }, [business]);

  const handleSave = (data: BusinessForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (imageFile) formData.append("imageFile", imageFile);
    updateBusiness(formData);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen text-[#6B2737]">
      Cargando...
    </div>
  );

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#6B2737]">Datos del Negocio</h2>
        <p className="text-gray-500 text-sm">Información de Cacao & Vainilla</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">

          {imagePreview && (
            <div className="w-full h-48 rounded-xl overflow-hidden mb-2">
              <img
                src={imagePreview}
                alt="negocio"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Imagen del negocio</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full text-sm text-gray-500 mt-1 border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Nombre del negocio *</label>
            <input
              {...register("name")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737] resize-none"
              placeholder="Descripción del negocio"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Teléfono</label>
              <input
                {...register("phone")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="4921234567"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Correo</label>
              <input
                {...register("email")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="correo@negocio.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Dirección</label>
            <input
              {...register("address")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
              placeholder="Dirección del negocio"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#C8803C] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#a6682e] disabled:opacity-50"
          >
            {isPending ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessPage;