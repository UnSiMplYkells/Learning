import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "../../Services/apiCart";
import { useUser } from "../Authentication/useUser";

export function useCartItem() {
  const { user } = useUser()
  const userId = user?.id

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCartItems(userId),
    enabled: !!userId,
  })

  return { cartItems, isLoading }
}