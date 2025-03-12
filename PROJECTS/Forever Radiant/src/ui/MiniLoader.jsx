import styled, { keyframes } from "styled-components";

const fallIn = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  20% { transform: translateY(0); opacity: 1; }
  80% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const LoaderPiece = styled.div`
  width: 6px;  /* Scaled down width */
  height: 16px; /* Scaled down height */
  background: currentColor; /* Inherits text color */
  animation: ${fallIn} 1.2s infinite ease-in-out;
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.15s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

function MiniLoader() {
  return (
    <LoaderWrapper>
      <LoaderPiece />
      <LoaderPiece />
      <LoaderPiece />
    </LoaderWrapper>
  );
}

export default MiniLoader;