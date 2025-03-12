import { forwardRef } from "react";
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: green;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
  
  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    top: 0;
    left: 10px;
    font-size: 12px;
    color: green;
    background-color: cyan;
    padding: 0 5px;
  }
`;

export default forwardRef(function CustomInput({ type, id, value, onClick, onChange, disabled, children, ...rest}, ref) {
  return (
      <InputContainer>
        <Input
          type={type}
          ref={ref}
          id={id}
          required
          placeholder=""
          value={value}
          onClick={onClick}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        <Label htmlFor={id}>{children}</Label>
    </InputContainer>
  );
})