import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { Product } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProducts = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getProductsRequest = async (): Promise<Product[]> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/product`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener los productos");
    return res.json();
  };

  return useQuery({ queryKey: ["products"], queryFn: getProductsRequest });
};

export const useCreateProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createProductRequest = async (formData: FormData) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/product`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Error al crear el producto");
    return res.json();
  };

  return useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      toast.success("Producto creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};

export const useUpdateProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateProductRequest = async ({ id, formData }: { id: string; formData: FormData }) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/product/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Error al actualizar el producto");
    return res.json();
  };

  return useMutation({
    mutationFn: updateProductRequest,
    onSuccess: () => {
      toast.success("Producto actualizado");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};
export const useDeleteProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteProductRequest = async (id: string) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al eliminar el producto");
    return res.json();
  };

  return useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      toast.success("Producto eliminado");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};