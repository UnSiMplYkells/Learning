import React from "react";
import styled from "styled-components";

const CloseButtonStyled = styled.button`
  display: block;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #bdbdbd;
  }

  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    background-color: #333;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  ${({ hideOnLogin }) => hideOnLogin && `
    @media (max-width: 700px) {
      display: none;
    }
  `}
`;

export default function CloseButton({ onClick, hideOnLogin }) {
  return <CloseButtonStyled onClick={onClick} hideOnLogin={hideOnLogin}/>;
}