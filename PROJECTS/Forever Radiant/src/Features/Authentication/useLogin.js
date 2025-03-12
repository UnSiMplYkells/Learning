import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../Services/apiAuth";
import { toast } from "react-hot-toast"

export function useLogin(){
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn:({email, password}) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user)
      queryClient.invalidateQueries(["user"]);
      toast.success("Login successful!");
      setTimeout(() => navigate("/home", {replace: true}), 500);
    },
    onError: (err) => { 
      toast.error("Provided credentials are incorrect")
    },
  })

  return {login, isLoading}
}

