import supabase from "./supabase"

export async function signup({email, fullName, password}){
  const { data, error } = await supabase.auth.signUp({
    email, 
    password, 
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  })

  if(error) throw new Error(error.message)

  return data
}

export async function login({email, password}){
  const  { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if(error) throw new Error(error.message)

  return data
}

export async function getCurrentUser(){
  const {data: {session} } = await supabase.auth.getSession()
  if(!session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)

  return data?.user || null
}

export async function loginWithOAuth(){

  const  { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo:  window.location.origin + "/home", // or your specific callback URL
    }
  })

  if(error) throw new Error(error.message)

  return data
}


export async function logout(){
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)

}

export async function updateCurrentUser({fullName, avatar, password}){
  let updateData;

  if(password) updateData = { password }
  const { data, error } = await supabase.auth.updateUser(updateData)
    if (error) throw new Error(error.message)

  if (fullName) updateData = { data: { fullName } }

  if (!avatar) return data

  const fileName = `avatar-${data.user.id}-${Math.random()}`
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, { cacheControl: "3600", upsert: true });

  if (storageError) throw new Error(storageError.message)

  const avatarUrl = `${import.meta.env.VITE_SUPABASE_STORAGE_URL}/${fileName}`;

  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: { avatar: avatarUrl },
    },
  })

  if (updateError) throw new Error(updateError.message)
  return updatedUser;
}