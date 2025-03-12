const flutterwaveKey = import.meta.env.VITE_FLUTTERWAVE_KEY
import { useUser } from "../Features/Authentication/useUser";
import { useOrderItems } from "../Features/Order/useOrderItem"
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import toast from "react-hot-toast";
import { useUpdateOrderStatus } from "../Features/Order/useUpdateOrderStatus";
import { useUpdateAvailable } from "../Features/Order/useUpdateAvailable";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../Services/apiProducts";
import styled from "styled-components";
import { useState } from "react";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  
  select{
    outline: none;
    border: none;
    padding: 10px 12px;
  }
`
const MenuHeading = styled.h2`
  font-weight: 500;
  text-transform: uppercase;

  span {
    font-weight: 700;
  }
`
const Wrapper = styled.div`
  width: 100%;
  padding: 15px 0 0 15px;

  display: grid;
  column-gap: 15px; // Adds spacing between grid items
  row-gap: 30px; 

  // Default: 1 column for screens below 900px
  grid-template-columns: repeat(1, 1fr);

  // 2 columns for screens between 900px and 1280px
  @media (min-width: 900px) and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // 3 columns for screens between 1280px and 1440px
  @media (min-width: 1280px) and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }

  // 4 columns for screens 1440px and above
  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
const Order = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: whitesmoke;
  padding: 15px;
`
const OrderDetails = styled.div`
  h5{
    color: grey;
    font-size: 1.3rem;
    @media(max-width: 450px){
      font-size: .86rem;
    }
  }

  p{
    font-weight: 500;
  }
`
const Status = styled.div`
  display: flex;
  gap: 10px;
  div{
    display: flex;
    align-items: center;
    gap: 5px;
  }
`
const StatusIcon = styled.div`
  background-color: red;
  width: 10px;  
  height: 10px;
  border-radius: 100%;
`
const StatusIconPaid = styled.div`
  background-color: green;
  width: 10px;  
  height: 10px;
  border-radius: 100%;
`
const Items = styled.ul`
  padding-left: 15px;
  list-style-type: upper-roman;
  
`
const OrderItems = styled.li`
  display: flex;
  gap: 20px; 
  text-transform: capitalize;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  font-weight: 600;
  padding: 10px 30px;
  margin-top: 10PX;
  text-transform: uppercase;
  color: white;
  background-color: brown;
  outline: none;
  border:none;

  transition: all .25s ease-in;

  &:hover{
    background-color: rgb(75, 16, 16);
    transform: scale(1.05);
    border-radius: 2px;
  }
`

export default function Orders(){
  const { data: DBProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProduct,
  });

  const { orderItems } = useOrderItems()
  const { user } = useUser();
  const { fullName } = user?.user_metadata
  const userEmail = user?.email
  const { updateOrderStatus } = useUpdateOrderStatus()
  const { updateAvailable } = useUpdateAvailable()
  const [sorted, setSorted] = useState("")

  if(orderItems?.length === 0 ) return <p>No orders found. Trying ordering some items</p>

  function handleUpdateAvailable(order){
    if (!DBProducts) return;
    
    order.order_items.forEach((item) => {
      const product = DBProducts.find(p => p.id === item.product_id);
      if (!product) return;

      const newAvailable = product.available - item.product_quantity;
      updateAvailable({ 
        productId: item.product_id, 
        productRemainder: newAvailable 
      });
    });
  };

  function handleSorted(e){
    setSorted(e.target.value)
  }

  console.log(sorted)

  const filteredOrders = orderItems?.filter((order) => {
    if (sorted === "all") return true; // Show all orders
    if (sorted === "Paid") return order.status === "paid"; // Show only paid orders
    if (sorted === "Not paid") return order.status !== "paid"; // Show only unpaid orders
    return true; // Fallback (default to showing all)
  });

  return(
    <>
      <Header>
        <MenuHeading>Your <span>Orders_</span> </MenuHeading>
        <select  onChange={handleSorted} name="sort by status">
          <option value="all">All</option>
          <option value="Paid">Paid</option>
          <option value="Not paid">Not paid</option>
        </select>
      </Header>

      <Wrapper>
        {filteredOrders?.map((order, index) => (
          <Order key={order.id}>
            <OrderDetails>
              <h3>Order #{index + 1}</h3>
              <h5>Order ID: {order.order_id}</h5> 
              <p>Total Price: ₦{order.total_price}</p>
              <Status>
                <p>Status:</p> 
                <div>
                  {order.status !== "paid" ? <StatusIcon></StatusIcon> : <StatusIconPaid></StatusIconPaid>}
                  <p> {order.status}</p>
                </div>
              </Status>
            </OrderDetails>
            <div>
              <h4>Items:</h4>
              <Items>
                {order.order_items.map((item) => (
                  <OrderItem  key={item.id} item={item}/>
                ))}
              </Items>
            </div>
            <ButtonWrapper>
              {order.status !== "paid" ? (
                  <Button
                    onClick={() => {
                      const dynamicConfig = {
                        public_key: flutterwaveKey,
                        tx_ref: Date.now(),
                        amount: order?.total_price, // Directly using order total price
                        currency: "NGN",
                        payment_options: "card,mobilemoney,ussd",
                        customer: {
                          email: userEmail,
                          phone_number: order?.contact, // Directly using order contact
                          name: fullName,
                        },
                        customizations: {
                          title: "Forever Radiant Inc.",
                          description: "Payment for ordered items",
                          logo: "https://dncqfwbhphbhudkwerlt.supabase.co/storage/v1/object/public/ui-images/logo1.png",
                        },
                      };

                      const handleFlutterPayment = useFlutterwave(dynamicConfig);

                      handleFlutterPayment({
                        callback: (response) => {
                          console.log(response);
                          closePaymentModal(); // Close modal after payment
                          if(response.status === "completed"){
                            updateOrderStatus({orderId: order?.order_id, newStatus: "paid"})
                            handleUpdateAvailable(order)
                          }
                        },
                        onClose: () => {
                          toast("Payment cancelled")
                        },
                      });
                    }}
                  >
                    Pay with FlutterWAVE
                  </Button>
                ) : null
              }
            </ButtonWrapper>
          </Order>
        ))}
      </Wrapper>
    </>
  )
} 

function OrderItem({ item }) {
  return(
    <OrderItems>
      <p>{item.product_name}</p>
      <p> Quantity: {item.product_quantity}</p>
      <p>Price: ₦{item.product_price } </p>
      <p>Size: {item.product_size_ml}ml</p>
    </OrderItems>
  )
}