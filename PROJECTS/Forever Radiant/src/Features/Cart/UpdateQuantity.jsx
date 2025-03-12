import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartQuantity } from "../../Services/apiCart";
import toast from "react-hot-toast";

const CounterContainer = styled.div`
  height: fit-content;
  width: fit-content;
  border-radius: 999px;
  border: 1px solid rgb(49, 49, 49);
  padding: 1px;

  display: flex;
  align-items: center;

`;

const QuantityDisplay = styled.h1`
  margin: 0 12px;
  font-size: 1.3rem;

  @media(max-width: 360px){
    margin: 0 6px;
    font-size: 1.1rem;
  }

  @media(min-width: 360px) and (max-width: 500px){ 
    margin: 0 8px;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #e0e0e0;
  border: none;
  transition: border 0.2s;

  &:focus {
    border: 1px solid #333; /* Add a 1px border on focus */
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media(max-width: 360px){
    height: 15px;
    width: 15px;
  }

  @media(min-width: 360px) and (max-width: 500px){
    height: 20px;
    width: 20px;
  }
`;

export default function UpdateQuantity({cartItemId, initialQuantity, available}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const queryClient = useQueryClient();

  const { mutate: updateQuantity } = useMutation({
    mutationFn: ({ cartItemId, newQuantity }) =>
      updateCartQuantity(cartItemId, newQuantity),
    onSuccess: (updatedItem) => {
      if (updatedItem) {
        setQuantity(updatedItem.quantity); // Immediately update UI
        queryClient.invalidateQueries(["cart"]); // Refresh cart data
        toast.success("Quantity updated")
      }
    },
    onError: () => {
      toast.error("Failed to update quantity. Please try again.")
    },
  });

  const increment = () => {
    if (quantity < 10) {
      updateQuantity({ cartItemId, newQuantity: quantity + 1 });
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity({ cartItemId, newQuantity: quantity - 1 });
    }
  };

  return (
    <CounterContainer>
      <Button onClick={decrement} disabled={initialQuantity === 1 }>-</Button>
      <QuantityDisplay>{initialQuantity}</QuantityDisplay>
      <Button onClick={increment} disabled={initialQuantity === 10 || initialQuantity >= available}>+</Button>
    </CounterContainer>
  );
}

