import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem as  deleteCartItemApi} from "../../Services/apiCart";
import toast from "react-hot-toast";
import { useUser } from "../Authentication/useUser";

export function useDeleteCartItem(){
  const queryClient = useQueryClient()
  const { user } = useUser();
  const userId = user?.id;

  const { mutate: deleteCartItem, isPending: deletingCartItem } = useMutation({
    mutationFn: ({userId, cartItemId}) => deleteCartItemApi(userId, cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]);
      toast.success("Product removed from cart");
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },

  });

  return { deleteCartItem, deletingCartItem }
}