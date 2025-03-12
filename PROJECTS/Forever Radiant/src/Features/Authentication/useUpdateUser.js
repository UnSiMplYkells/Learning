import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../Services/apiAuth";

export function useUpdateUser(){
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isUpdating} = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["user", variables.userId]);
    }
  })

  const updateUser = async (userData) => {
    return toast.promise(
      mutateAsync(userData),
      {
        loading: "Saving...",
        success: "User account successfully updated",
        error: "Could not save.",
      }
    );
  };

  return { updateUser, isUpdating }
}
