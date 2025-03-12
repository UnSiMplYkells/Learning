import React, { useState } from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 0 3px;
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
`;

const QuantityDisplay = styled.h1`
  margin: 0 12px;
  font-size: 1.3rem;
`;

const QuantityCounter = ({ setQuantity, isATCart, available }) => {
  const [quantity, setLocalQuantity] = useState(1);

  const increment = () => {
    if (quantity < 10) {
      setLocalQuantity(quantity + 1);
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setLocalQuantity(quantity - 1);
      setQuantity(quantity - 1);
    }
  };

  return (
    <CounterContainer>
      <Button onClick={decrement} disabled={quantity === 1 || isATCart }>-</Button>
      <QuantityDisplay>{quantity}</QuantityDisplay>
      <Button onClick={increment} disabled={quantity === 10 || isATCart || quantity >= available}>+</Button>
    </CounterContainer>
  );
};

export default QuantityCounter;
