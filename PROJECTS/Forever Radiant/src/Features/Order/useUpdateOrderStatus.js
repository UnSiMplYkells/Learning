import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus as updateOrderStatusApi } from "../../Services/apiOrder";

export function useUpdateOrderStatus(){

  const queryClient = useQueryClient()
  
  const {mutate: updateOrderStatus} = useMutation({
    mutationFn: ({orderId, newStatus}) => updateOrderStatusApi(orderId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"])
    },
    onError: (error) => {
      throw new Error(error.message)
    }
  })

  return { updateOrderStatus }
}