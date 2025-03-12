import { useState } from "react";
import { useUserDetailed } from "../../Services/apiUsers";
import { useUser } from "../Authentication/useUser";
import { useSelector } from "react-redux";
import { useCartItem } from "../Cart/useCartItems";
import { useCreateOrder } from "./useCreateOrder"; 
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import MiniLoader from "../../ui/MiniLoader";
import { createOrderItems } from "../../Services/apiOrder";
import { v4 as uuidv4 } from 'uuid';
import { useDeleteMultipleCartItem } from "./useDeleteMultipleCartItem";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin-top: 30px;
`
const MenuHeading = styled.h2`
  font-weight: 500;
  text-transform: uppercase;

  span {
    font-weight: 700;
  }
`;
const Wrapper = styled.div`
  margin-left: 10px;
`
const UserDetails = styled.div`
  width: 80%;
  padding-bottom: 15px;
  font-weight: 500;
  padding-top: 5px;
`
const Name = styled.p`
  text-transform: capitalize;
  padding: 5px 5 0; 
`
const DeliveryDetails = styled.div`
  @media (min-width: 700px) and (max-width: 1000px) {
    display: grid;
    grid-template-areas: 
      "shipping contact"
      "zipcode zipcode";
    gap: 20px;
  }

  @media (min-width: 1000px) {
    display: flex;
    gap: 50px;
  }
`
const ShippingDetails = styled.div`
  width: 100%;

  @media (min-width: 1000px) {
    width: 40%;
  }

  @media (min-width: 700px) and (max-width: 1000px) {
    grid-area: shipping;
    width: 100%;
  }
`
const Select = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  select{
    padding: 4px;
    outline: none;
    border: none;
    &:focus{
      border: 1px solid red;
    }
  } 

  label{
    font-size: 13px;
  }
`
const Zipcode = styled.div`
  width: 50%;

  @media(max-width: 700px){
    padding-top: 20px;
  }

  @media (min-width: 700px) and (max-width: 1000px) {
    grid-area: zipcode;
    width: 200px;
  }

  @media (min-width: 1000px) {
    width: 20%;
    align-self: center;
  }

  label{
    font-weight: 500;
  }

  div{
    display: flex;
    flex-direction: column;
  }

  input{
    padding: 8px;
    outline: none;
    border: 1px dotted grey;
    margin: 0 0 5px 10px;

    &:focus{
      border: 1px solid red;
    }
  }
`
const ContactInfo = styled.div`
  width: 100%;
  padding-top: 18px;

  @media (min-width: 1000px) {
    width: 40%;
  }

  @media (min-width: 700px) and (max-width: 1000px) {
    grid-area: contact;
    width: 100%;
  }
`
const Wrapper2 = styled.div`
  padding: 10px 0 0 5px;
`
const DetailsInput = styled.div`
  p{
    cursor: pointer;
  }

  span{
    padding: 4px 12px;
    border: 1px solid red;
    margin-right: 3px;

    &:hover{
      border-color: #f0f0f0;
    }
  }

  textarea, input{
    padding: 8px;
    outline: none;
    border: 1px dotted grey;
    margin: 10px 0 5px 10px;

    &:focus{
      border: 1px solid red;
    }
  }
`
const StyledButton = styled(Button)`
  width: 150px;
  padding: 18px; 
  margin-top: 20px;
`

export default function  OrderDelivery(){
  const { user } = useUser();
  const { cartItems } = useCartItem();
  const { data: userDetailsItem } = useUserDetailed();
  const { createOrder, isCreatingOrder } = useCreateOrder()
  const { deleteMultipleCartItem } = useDeleteMultipleCartItem();
    const fullNameDisplay = user?.user_metadata?.fullName || user?.user_metadata?.full_name;
  const { address_I, phonenumber_I, address_II, phonenumber_II } = userDetailsItem || {}
  const [shippingAddress, setShippingAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [showNewAddress, setShowNewAddress] = useState(false)
  const [showNewPhoneNumber, setShowNewPhoneNumber] = useState(false)
  const totalPrice = useSelector(state => state.cart.totalAmount)
  const checkedItems = useSelector((state) => state.cart.checkedItems);
  const navigate = useNavigate();
  const userId = user?.id
  const userEmail = user?.email

  const checkedCartItems = cartItems?.filter((item) => 
    checkedItems.includes(item.id)
  );

  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Change to false for 24-hour format
  });

  const shipTo = newAddress || shippingAddress
  const contactInfo = newPhoneNumber || phoneNumber
  const orderStatus = "not paid"

  async function handlePlaceOrder(){
    try{
      if(checkedCartItems.length === 0) return toast("Please select items to order in your cart")
      if(!newAddress && !shippingAddress || !newPhoneNumber && !phoneNumber) return toast("Please enter shipping details")
      if(newAddress && shippingAddress) return toast("Please use only one address")
      if(newPhoneNumber && phoneNumber) return toast("Please use only one phone number")
      if(!zipCode || zipCode.length !== 6) return toast("Please input a valid zipcode")
      if(newPhoneNumber.length >= 11 && newPhoneNumber.length <= 13) return toast("Please input a valid phone number")

      const orderId = uuidv4()+formattedDate+formattedTime;

      const orderDetails = await createOrder({userId, totalPrice, orderStatus, zipCode, shipTo, orderId, fullName: fullNameDisplay, userEmail, contactInfo})
        
        if(!orderDetails?.id){
          throw new Error("Order ID not returned");
        }

      await createOrderItems(userId, orderId, checkedCartItems);

      navigate("/order")

      if(checkedCartItems.length > 0) {
        await deleteMultipleCartItem({ userId, checkedCartItems });
      }
      
    } catch (error) {
      if(error) throw  new Error(error.message)
    }
  }

  console.log(userDetailsItem)
  
  return (
    <Container>
      <MenuHeading>Delivery <span>Details_</span> </MenuHeading>
      <Wrapper>
        <UserDetails>
          <Name>{fullNameDisplay}</Name>
          <p>Selected Address: { newAddress || shippingAddress}</p>
          <p>Selected phone number: { newPhoneNumber || phoneNumber }</p>
          <p>Zipcode: {zipCode}</p>
        </UserDetails>
        <DeliveryDetails>
          <ShippingDetails>
            <h5>Shipping address</h5>
            <Wrapper2>
              <DetailsInput>
                <p onClick={()=>setShowNewAddress(!showNewAddress)}><span>+</span> add new address</p>
                {showNewAddress && (
                  <textarea
                    id="new shipping address"
                    placeholder="New address"
                    cols="32"
                    rows="3"
                    value={newAddress}
                    onChange={(e)=>setNewAddress(e.target.value)}
                  />
                )}
              </DetailsInput>
              { (userDetailsItem?.address_I || userDetailsItem?.address_I) && (
                <Select>
                  <label htmlFor="address">Choose an address:</label>
                  <select name="address" onClick={(e)=>setShippingAddress(e.target.value)}>
                    { address_I && <option value={address_I} >Address 1</option> }
                    { address_II &&<option value={address_II}>Address 2</option> }
                  </select>
                </Select>
              )}
            </Wrapper2>
          </ShippingDetails>
          <Zipcode>
            <div>
              <label htmlFor="zipcode">Zipcode:</label>
              <input
                type="number"
                name="zipcode"
                id="zipcode"
                minLength="6"
                maxLength="6"
                placeholder="zip code (6 digits)"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
          </Zipcode>
          <ContactInfo>
            <h5>Contact Info</h5>
            <Wrapper2>
              <DetailsInput>
                <p onClick={()=>setShowNewPhoneNumber(!showNewPhoneNumber)}><span>+</span> add new phone number</p>
                {showNewPhoneNumber && (
                  <input
                    type="number"
                    id="new phone number"
                    placeholder="phone number"
                    minLength="11"
                    maxLength="15"
                    value={newPhoneNumber}
                    onChange={(e)=>setNewPhoneNumber(e.target.value)}
                  />
                )}
              </DetailsInput>
              { userDetailsItem?.phonenumber_I || userDetailsItem?.phonenumber_II && (
                <Select>
                  <label htmlFor="phone number">Choose a phone number:</label>
                  <select name="phone number" onClick={(e)=> setPhoneNumber(e.target.value)}>
                    { phonenumber_I && <option value={phonenumber_I}>Phone number 1</option>}
                    { phonenumber_II && <option value={phonenumber_II}>Phone number 2</option>}
                  </select>
                </Select>
              )}
            </Wrapper2>
          </ContactInfo>
        </DeliveryDetails>
        <StyledButton size="large" variation="danger" onClick={handlePlaceOrder} disabled={isCreatingOrder}>{ isCreatingOrder ? <MiniLoader /> : "PLACE ORDER" }</StyledButton>
      </Wrapper>
    </Container>
  )
}
