import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { Provider } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProviders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getProvidersRequest = async (): Promise<Provider[]> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/provider`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener los proveedores");
    return res.json();
  };

  return useQuery({ queryKey: ["providers"], queryFn: getProvidersRequest });
};

export const useCreateProvider = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createProviderRequest = async (formData: Partial<Provider>) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/provider`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Error al crear el proveedor");
    return res.json();
  };

  return useMutation({
    mutationFn: createProviderRequest,
    onSuccess: () => {
      toast.success("Proveedor creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};

export const useUpdateProvider = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateProviderRequest = async ({ id, ...formData }: Partial<Provider> & { id: string }) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/provider/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Error al actualizar el proveedor");
    return res.json();
  };

  return useMutation({
    mutationFn: updateProviderRequest,
    onSuccess: () => {
      toast.success("Proveedor actualizado");
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};

export const useDeleteProvider = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteProviderRequest = async (id: string) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/provider/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al eliminar el proveedor");
    return res.json();
  };

  return useMutation({
    mutationFn: deleteProviderRequest,
    onSuccess: () => {
      toast.success("Proveedor eliminado");
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};