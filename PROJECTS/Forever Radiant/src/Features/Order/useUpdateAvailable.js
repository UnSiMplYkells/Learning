import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvailable as updateAvailableApi } from "../../Services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateAvailable(){
  const queryClient = useQueryClient()
  
  const {mutate: updateAvailable} = useMutation({
    mutationFn: ({productId, productRemainder}) => updateAvailableApi(productId, productRemainder),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"])
    },
    onError: (error) => {
      console.error(error.message)
    }
  })

  return { updateAvailable }
}