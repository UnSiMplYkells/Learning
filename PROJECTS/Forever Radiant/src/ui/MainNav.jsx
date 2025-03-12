import { NavLink } from "react-router-dom";
import { IoIosHome } from "react-icons/io"
import { MdCollections } from "react-icons/md"
import { FaCircleInfo } from "react-icons/fa6";
import styled from "styled-components";



const StyledNavLink = styled(NavLink)`
  font-size: clamp(1rem, 2vw + 1px, 2.2rem);
  white-space: nowrap;

  &:link,
  &:visited {
    color: var(--color-grey-700);
    padding: clamp(0.8rem, 1.5vw, 1.2rem) clamp(1rem, 3vw, 2.4rem);
    transition: all 0.3s;
    border-radius: var(--border-radius-sm);
    width: fit-content;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brown);
    background-color: var(--color-grey-300);
  }

  & svg {
    width: clamp(1.2rem, 4vw, 2.4rem);
    height: clamp(1.2rem, 4vw, 2.4rem);
    color: var(--color-grey-700);
    transition: all 0.3s;

    /*to position the svg well*/
    position: relative; 
    top: clamp(0.2rem, 1vw, 0.5rem);
    left: clamp(0.4rem, 1.5vw, 1rem);
    
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brown);
  }

    @media (width < 750px) {
      &:hover,
      &:active,
      &.active:link,
      &.active:visited {
        color: var(--color-brown);
        background-color: white;
      }

      & svg{
        display: none;
      }
    }
    
    @media (min-width: 1024px) and (max-width: 1240px){
      & svg{
        display: none;
      }
    }
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: nowrap; /* Prevent wrapping */
`;

export default function MainNav() {
  return (
    <nav>
      <StyledUl>
        <li>
          <StyledNavLink to="/home">
            <span>Home</span>
            <IoIosHome />
          </StyledNavLink>
          <StyledNavLink to="/collection">
            <span>Collections</span>
            <MdCollections />
          </StyledNavLink>
          <StyledNavLink to="/about">
            <span>About us</span> 
            <FaCircleInfo />
          </StyledNavLink>
        </li>
      </StyledUl>
    </nav>
  )
}
