import supabase from "./supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Features/Authentication/useUser";
import toast from "react-hot-toast";

export async function updateUserDetails(userId, updates){
  const { data: existingDetailItem, error: existingError} = await supabase
    .from("users")
    .select("*")
    .eq('user_id', userId)
    .single()

  if (existingError && existingError.code !== 'PGRST116') {
    throw new Error(existingError.message);
  }

  if (existingDetailItem) {
    const changes = {};
    let hasChanges = false;

      // Check each field for changes
    ['address_I', 'phonenumber_I', 'address_II', 'phonenumber_II'].forEach((field) => 
    {
      if (updates[field] && updates[field] !== existingDetailItem[field]) {
        changes[field] = updates[field];
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      toast.error("No changes detected - details already exist");
      return { existingDetailItem };
    }

    const { data, error } = await supabase
      .from('users')
      .update(changes)
      .eq('user_id', userId)
      .select();

    if (error) throw new Error(error.message);
    return { updated: data };
  }  

  const { data, error } = await supabase
    .from('users')
    .upsert(
      { user_id: userId, ...updates },
    )
    .select()

  if(error) throw new Error(error.message)

  return { newDetailItem: data }
}

export function useUpdateUserDetails(){
  const queryClient = useQueryClient();

  const {mutate: updatedUserDetails, isPending: isUpdatingUserDetails} = useMutation({
    mutationFn: ({userId, ...updates}) => updateUserDetails(userId, updates),
    onSuccess: (data, variables) => {
      if (data?.newDetailItem) {
        toast.success("Details created successfully")
      } else if (data.updated) {
        toast.success("Details updated successfully")
      }
      queryClient.invalidateQueries(["users", variables.userId]);
    },
    onError: (error) => {
      toast(`Update failed: ${error.message}`);
    },
  })

  return { updatedUserDetails, isUpdatingUserDetails}
}

export async function fetchUpdatedUserDetails(userId){
  if (!userId) return null;

  const { data: userDetailed, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if(error) throw new Error(error.message)

  return userDetailed || null
}

export function useUserDetailed() {
  const { user } = useUser()
  const userId = user?.id

  const { data, isLoading } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUpdatedUserDetails(userId),
    enabled: !!userId,
  })

  return { data, isLoading }
}
