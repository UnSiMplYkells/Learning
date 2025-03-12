import supabase from "./supabase";

export async function createOrder(userId, totalPrice, orderStatus, zipCode, shipTo, orderId, fullName, userEmail, contactInfo){
  const { data: orderDetails, error } = await supabase
    .from("orders")
    .insert([
        {
          user_id: userId,
          total_price: totalPrice,
          status: orderStatus,
          zip_code: zipCode,
          shipping_address: shipTo,
          order_id: orderId,
          email: userEmail,
          full_name: fullName,
          contact: contactInfo,
        },
      ])
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error.message);
    throw new Error(error.message)
  }

  return orderDetails
};

export async function createOrderItems(userId, orderId, checkedCartItems) {
  // Map each checked cart item to the fields required by order_items
  const items = checkedCartItems.map(item => ({
    user_id: userId,
    order_id: orderId,
    product_name: item.products.name,   
    product_quantity: item.quantity,    
    product_price: item.products.price,
    product_size_ml: item.size,
    product_id: item.product_id
  }));

  // Insert all items into the order_items table
  const { data, error } = await supabase
    .from("order_items")
    .insert(items);

  if (error) {
    console.error("Error inserting order items:", error.message);
    throw error;
  }
  return data;
}

export async function fetchOrderItems(userId) {
  if (!userId) return [];

  const { data: fetchedOrderItems, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  return fetchedOrderItems;
};

export async function updateOrderStatus(orderId, newStatus) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq('order_id', orderId) // Assuming 'id' is the unique cart item identifier
    .select()
    .single();

  if (error) console.error("Error updating status:", error.message);

  return data;
}

export async function deleteMultipleCartItem(userId, checkedCartItems) {
  // Map each checked cart item to the fields required by order_items
  const cartItemIds = checkedCartItems.map(item => item.id);

  // Insert all items into the order_items table
  const { data: deleteMultipleCartItem, error } = await supabase
    .from("cart")
    .delete()
    .in("id", cartItemIds) // Filter by product ID
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("Error deleting multiple cart items:", error.message);
    throw new Error(error.message);
  }

  return deleteMultipleCartItem;
}

