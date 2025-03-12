import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithOAuth } from "../../Services/apiAuth";

export function useLoginWithOAuth() {
  const queryClient = useQueryClient();

  const { mutate: loginWithOAuthMutation, isPending } = useMutation({
    mutationFn: loginWithOAuth,
    onSuccess: () => {
      // Invalidate the user query to trigger a refetch
      setTimeout(() => {
        queryClient.invalidateQueries(["user"]);
      }, 1000);
    },
  });

  return { loginWithOAuthMutation, isPending };
}