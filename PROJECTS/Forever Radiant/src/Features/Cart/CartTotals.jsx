import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import { useCartItem } from "./useCartItems";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { updateTotalAmount } from "../../store";

export default function CartTotal(){
  const location = useLocation()
  const dispatch = useDispatch();
  const { cartItems } = useCartItem()
  const checkedItems = useSelector(state => state.cart.checkedItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  const checkedCartItems = cartItems?.filter(item => 
    checkedItems.includes(item.id)
  )

  const subtotal = checkedCartItems?.reduce((total, item) => {
    return total + item.products.price * item.quantity
  }, 0) || 0

  const shippingFee = 0

  const total = subtotal + shippingFee;
  
  useEffect(() => {
    dispatch(updateTotalAmount(total));
  }, [total, dispatch]);

  if (checkedItems.length === 0) return null

  return(
    <CartTotals $isPlaceOrderPage={location.pathname === "/place-order"}>
      { location.pathname !== "/place-order" ? (
          <TotalsHeading>cart <span>Totals_</span></TotalsHeading>
        ) : (
          <TotalsHeading>Order <span>Total_</span></TotalsHeading>
        )
      }
      <div>
      
        <SubHeading>
          <p>Subtotal</p>
          <p>₦{subtotal?.toFixed(2)}</p>
        </SubHeading>
        <SubHeading>
          <p>Shipping Fee</p>
          <p>{shippingFee === 0 && "Free Shipping"}</p>
        </SubHeading>
        <SubHeading $total>
          <p>Total</p>
          <p>₦{totalAmount?.toFixed(2)}</p>
        </SubHeading>
      </div>
      {location.pathname !== "/place-order" && (
        <Link to="/place-order">
          <StyledButton size="large" variation="cart">PROCEED TO PLACE ORDER</StyledButton>
        </Link>
      )}
    </CartTotals>
  )
}

const TotalsHeading = styled.h2`
  font-weight: 500;
  text-transform: uppercase;
  padding-bottom: 1rem;

  span {
    font-weight: 700;
  }
`;

const CartTotals = styled.div`
  max-width: 500px;
  margin-top: 60px;
  margin-left: 0;

  @media(min-width: 600px){
    margin-left: auto;
  } 

  ${(props) =>
    props.$isPlaceOrderPage && 
    css`
      @media(min-width: 600px){
        margin-left: 0;
      } 
      @media(max-width: 1000px){
        margin-top: 30px;
      }
      margin-top: 0;
    `
  }
`

const SubHeading = styled.div`
  padding: 6px 10px;
  border-bottom: 1px solid green;
  font-weight: 500;

  display: flex;
  justify-content: space-between;

  ${(props) =>
    props.$total &&
    css`
      font-weight: 700;
      border-bottom: none;
    `}
`

const StyledButton = styled(Button)`
  width: fit-content;
  margin-top: 10px; 
  padding: 15px;
  float: right;
`;