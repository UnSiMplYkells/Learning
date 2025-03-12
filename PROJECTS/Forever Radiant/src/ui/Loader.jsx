import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  20% { background-position: 0% 0%, 50% 50%, 100% 50%; }
  40% { background-position: 0% 100%, 50% 0%, 100% 50%; }
  60% { background-position: 0% 50%, 50% 100%, 100% 0%; }
  80% { background-position: 0% 50%, 50% 50%, 100% 100%; }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  inset: 0; /* Covers the entire parent, including padding & margin */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(226, 232, 240, 0.2); /* Slight dim effect */
  backdrop-filter: blur(5px);
  z-index: 10; /* Ensures it overlays other content */
`;

const StyledLoader = styled.div`
  width: 45px;
  aspect-ratio: 0.75;
  --c: no-repeat linear-gradient(#292524 0 0); /* theme(colors.stone.800) */
  background: var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;
  background-size: 20% 50%;
  animation: ${loadingAnimation} 1s infinite linear;
`;

function Loader() {
  return (
    <LoaderWrapper>
      <StyledLoader />
    </LoaderWrapper>
  );
}

export default Loader;

// import styled, { keyframes } from "styled-components";

// const fallIn = keyframes`
//   0% { transform: translateY(-100%); opacity: 0; }
//   20% { transform: translateY(0); opacity: 1; }
//   80% { transform: translateY(0); opacity: 1; }
//   100% { transform: translateY(100%); opacity: 0; }
// `;

// const LoaderWrapper = styled.div`
//   position: absolute;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: rgba(226, 232, 240, 0.2); /* Light overlay */
//   backdrop-filter: blur(5px);
//   z-index: 10;
// `;

// const LoaderPiece = styled.div`
//   width: 15px;
//   height: 40px;
//   background: #292524; /* Dark stone color */
//   margin: 0 5px;
//   animation: ${fallIn} 1.5s infinite ease-in-out;
  
//   &:nth-child(1) {
//     animation-delay: 0s;
//   }
//   &:nth-child(2) {
//     animation-delay: 0.2s;
//   }
//   &:nth-child(3) {
//     animation-delay: 0.4s;
//   }
// `;

// function Loader() {
//   return (
//     <LoaderWrapper>
//       <LoaderPiece />
//       <LoaderPiece />
//       <LoaderPiece />
//     </LoaderWrapper>
//   );
// }

// export default Loader;
