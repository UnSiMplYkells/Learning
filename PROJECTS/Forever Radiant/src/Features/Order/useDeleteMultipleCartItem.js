import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { deleteMultipleCartItem as  deleteMultipleCartItemApi} from "../../Services/apiOrder";
import toast from "react-hot-toast";

export function useDeleteMultipleCartItem(){
  const queryClient = useQueryClient()
  const { user } = useUser();
  const userId = user?.id;

  const { mutateAsync: deleteMultipleCartItem } = useMutation({
    mutationFn: ({userId, checkedCartItems}) => deleteMultipleCartItemApi(userId, checkedCartItems),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]);
    },
    onError: (error) =>{
      console.error("`Error deleting items", error.message)
    }
  });

  return { deleteMultipleCartItem }
}