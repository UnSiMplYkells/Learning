import styled from "styled-components"
import Logo from "./Logo"
import MainNav from "./MainNav"
import MiniNav from "./MiniNav"

const StyledHeader = styled.header`
  border-bottom: 5px  ridge rgb(146, 172, 143);
  height: auto;
  width: 100%;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(width > 1000px) {
    gap: 3rem;
  }
`

export default function Header() {
  
  return (
    <div>
      <StyledHeader>
        <Logo/>
        <MainNav/>
        <MiniNav/>
      </StyledHeader>    
    </div>
  )}
