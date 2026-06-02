import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Business = {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
};

export const useGetBusiness = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getBusinessRequest = async (): Promise<Business> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/business`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener los datos del negocio");
    return res.json();
  };

  return useQuery({ queryKey: ["business"], queryFn: getBusinessRequest });
};

export const useUpdateBusiness = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateBusinessRequest = async (formData: FormData) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/business`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Error al actualizar los datos del negocio");
    return res.json();
  };

  return useMutation({
    mutationFn: updateBusinessRequest,
    onSuccess: () => {
      toast.success("Datos del negocio actualizados");
      queryClient.invalidateQueries({ queryKey: ["business"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};