import supabase from "./supabase";
const SupabaseApiKey = import.meta.env.VITE_SUPABASE_KEY;

export async function getProduct() {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}


export async function fetchProductDetails(productId) {
  const url = `${import.meta.env.VITE_SUPABASE_API_URL}/products?id=eq.${productId}`;
  const response = await fetch(url, {
    headers: {
      apikey: SupabaseApiKey,
      Authorization: `Bearer ${SupabaseApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data = await response.json();
  return data[0];
};

export async function updateAvailable(productId, productRemainder){
  const { data, error } = await supabase
    .from("products")
    .update({available: productRemainder})
    .eq("id", productId)
    .select()
    .single();

  if (error) console.error("Error updating status:", error.message);

  return data;
}
