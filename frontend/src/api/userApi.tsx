import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCurrentUser = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getCurrentUserRequest = async (): Promise<User> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener el usuario");
    return res.json();
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserRequest,
    enabled: isAuthenticated,
  });
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createUserRequest = async (formData: Partial<User>) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Error al crear el usuario");
    return res.json();
  };

  return useMutation({
    mutationFn: createUserRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    onError: (err) => toast.error(err.toString()),
  });
};