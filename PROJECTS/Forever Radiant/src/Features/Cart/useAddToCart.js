import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart as addToCartApi } from "../../Services/apiCart";
import toast from "react-hot-toast";

export function useAddToCart(){
  const queryClient = useQueryClient();

  const {mutate: addToCart, isPending: isATCart } = useMutation({
    mutationFn: ({ productId, userId, quantity, selectedVolume }) => addToCartApi(productId, userId, quantity, selectedVolume),
    onSuccess: (data) => {
      if (data?.newItem) {
        toast.success("Successfully added to cart");
        queryClient.invalidateQueries(["cart"])
      }
    },
    onError: () =>{
      toast.error("Failed to add to cart");
    }
  })

  return { addToCart, isATCart}
}

export function useAddToCart2(){
  const queryClient = useQueryClient();

  const {mutate: addToCart2, isPending: isATCart2 } = useMutation({
    mutationFn: ({ productId, userId, quantity, selectedVolume }) => addToCartApi(productId, userId, quantity, selectedVolume),
    onSuccess: (data) => {
      if (data?.newItem) {
        queryClient.invalidateQueries(["cart"])
      }
    },
    onError: () =>{
      toast.error("Failed to add to cart");
    }
  })

  return { addToCart2, isATCart2}
}