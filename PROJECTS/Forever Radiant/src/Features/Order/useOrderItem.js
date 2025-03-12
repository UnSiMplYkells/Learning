import { useQuery } from "@tanstack/react-query"
import { useUser } from "../Authentication/useUser"
import { fetchOrderItems } from "../../Services/apiOrder"

export function useOrderItems(){
  const { user } = useUser()
  const userId = user?.id

  const { data: orderItems, isLoading } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchOrderItems(userId),
    enabled: !!userId,
  })

  return { orderItems, isLoading }
}