import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: whitesmoke;
  padding: .3rem 0;
  border-radius: 2px;
  width: 300px;
  max-width: 500px;
  text-align: center;
  position: relative;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

export default function PopUp({ isPopUpVisible, onClosePopUp, children }) {
  if (!isPopUpVisible) return null;

  return (
    <ModalOverlay onClick={onClosePopUp}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h4>{children}</h4>
      </ModalContent>
    </ModalOverlay>
  );
}
