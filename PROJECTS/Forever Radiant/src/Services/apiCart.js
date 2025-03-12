import supabase from "./supabase";
import toast from "react-hot-toast";

export async function addToCart(productId, userId, quantity, selectedVolume) {
  const { data: existingCartItem, error: fetchError } = await supabase
    .from('cart')
    .select('*')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .eq('size', selectedVolume)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error checking cart:', fetchError);
    return;
  }

  if (existingCartItem) {
    toast("Product already in cart")
    return existingCartItem
  }  
  
  const { data, error } = await supabase
    .from('cart')
    .insert([
        { product_id: productId, user_id: userId, quantity: quantity, size: selectedVolume, }
    ])
    .select()
    .single()
  
    if(error) throw new Error(error.message)

  return { newItem: data }
}


export async function fetchCartItems(userId) {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('cart')
    .select('*, products (name, image_url, price, available)')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) console.error('Error fetching cart items:', error);

  return data
}

export async function updateCartQuantity(cartItemId, newQuantity) {
  const { data, error } = await supabase
    .from('cart')
    .update({ quantity: newQuantity })
    .eq('id', cartItemId) // Assuming 'id' is the unique cart item identifier
    .select()
    .single();

  if (error) console.error("Error updating quantity:", error);

  return data;
}

export async function deleteCartItem(userId, cartItemId) {
  const { data: deleteCartItem, error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId) // Filter by user ID
    .eq("id", cartItemId) // Filter by product ID
    .select();

  if (error) throw new Error(error.message);
  return deleteCartItem;
}