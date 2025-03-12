import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {logout as logoutApi} from "../../Services/apiAuth"
import { toast } from "react-hot-toast"

export function useLogout(){
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {mutate: logout, isPending: isLoading} = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries()
      navigate("/login", {replace: true})
      toast.success("Successfully Logged out!");
    }
  })

  return { logout, isLoading}
}