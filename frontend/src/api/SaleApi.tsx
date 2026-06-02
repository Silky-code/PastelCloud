import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type SaleDetailInput = {
  productId: string;
  quantity: number;
};

type CreateSaleInput = {
  details: SaleDetailInput[];
  paymentMethod: "efectivo" | "tarjeta" | "otro";
};

export const useCreateSale = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createSaleRequest = async (saleData: CreateSaleInput) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/sale`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleData),
    });
    if (!res.ok) throw new Error("Error al registrar la venta");
    return res.json();
  };

  return useMutation({
    mutationFn: createSaleRequest,
    onSuccess: () => {
      toast.success("Venta registrada correctamente");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.toString()),
  });
};