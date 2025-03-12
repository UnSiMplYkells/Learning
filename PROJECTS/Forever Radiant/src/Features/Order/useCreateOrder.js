import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi} from "../../Services/apiOrder";
import toast from "react-hot-toast";

export function useCreateOrder(){
  const queryClient = useQueryClient()

  const {mutateAsync: createOrder, isPending: isCreatingOrder} = useMutation({
    mutationFn: ({userId, totalPrice, orderStatus, zipCode, shipTo, orderId, fullName, userEmail, contactInfo}) => createOrderApi(userId, totalPrice, orderStatus, zipCode, shipTo, orderId, fullName, userEmail, contactInfo),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"])
      toast.success("Order placed successfully")
    },
    onError: (error) => {
      toast.error("could not place order");
    },
  })

  return { createOrder, isCreatingOrder}
}
