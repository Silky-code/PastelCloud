import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Provider } from "../types";

const providerSchema = z.object({
  name:    z.string().min(1, "El nombre es requerido"),
  contact: z.string().optional(),
  phone:   z.string().optional(),
  email:   z.string().email("Email inválido").optional().or(z.literal("")),
  address: z.string().optional(),
});

type ProviderForm = z.infer<typeof providerSchema>;

type Props = {
  provider?: Provider;
  onClose: () => void;
  onSave: (data: ProviderForm) => void;
  isLoading?: boolean;
};

const ProviderModal = ({ provider, onClose, onSave, isLoading }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProviderForm>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name:    provider?.name    ?? "",
      contact: provider?.contact ?? "",
      phone:   provider?.phone   ?? "",
      email:   provider?.email   ?? "",
      address: provider?.address ?? "",
    }
  });

  useEffect(() => {
    reset({
      name:    provider?.name    ?? "",
      contact: provider?.contact ?? "",
      phone:   provider?.phone   ?? "",
      email:   provider?.email   ?? "",
      address: provider?.address ?? "",
    });
  }, [provider]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="bg-[#6B2737] text-white px-5 py-4 rounded-t-xl flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            {provider ? "Editar Proveedor" : "Agregar Proveedor"}
          </h3>
          <button onClick={onClose} className="hover:text-gray-300 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-5 space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Nombre *</label>
            <input
              {...register("name")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
              placeholder="Razón social o nombre"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Contacto</label>
              <input
                {...register("contact")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="Nombre del contacto"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Teléfono</label>
              <input
                {...register("phone")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
                placeholder="Ej. 4921234567"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Correo</label>
            <input
              {...register("email")}
              type="email"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Dirección</label>
            <input
              {...register("address")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-[#6B2737]"
              placeholder="Dirección del proveedor"
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

export default ProviderModal;