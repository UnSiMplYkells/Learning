import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Styled component for the logo image
const StyledImg = styled.img`
  height: clamp(7rem, 5.6vw, 9.5rem);
  max-width: 40rem;
  object-fit: cover;
  cursor: pointer;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  height: 100%;
`;

export default function Logo() {
  return (
    <StyledNavLink to="/home">
      <StyledImg src="https://dncqfwbhphbhudkwerlt.supabase.co/storage/v1/object/public/ui-images/logo1.png" alt="logo" />
    </StyledNavLink>
  );
}
