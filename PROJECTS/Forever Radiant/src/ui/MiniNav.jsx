import { NavLink } from "react-router-dom";
import { useUser } from "../Features/Authentication/useUser";
import { IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import Button from "./Button";
import { useCartItem } from "../Features/Cart/useCartItems";

const Li = styled.li`
  display: flex;
  align-items: center;
  gap: clamp(.8rem, 2vw, 2rem);/* Dynamic gap between elements */
  
  @media (min-width: 1024px) {
    margin-right: 20px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  position: relative;
  
  &:link,
  &:visited {
    color: var(--color-grey-700);
    padding:10px 15px; 
    transition: all 0.3s;

    @media (width < 500px) {
      padding:10px 8px;
    }
  }

  & svg {
    width: clamp(2.2rem, 5vw, 5rem);
    height: clamp(2.2rem, 5vw, 5rem);
    transition: all 0.3s;

    position: relative;
    top: clamp(0.2rem, 0.5vw, 0.3rem);
  }

  &:hover svg {
    transform: scale(1.15);
  }

  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-grey-900);
  }
`;

const Img = styled.img`
  width: 55px;
  aspect-ratio: 1;
  border-radius: 100%;
  transition: all .3s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 500px) {
    width: 45px;
  }

  @media (min-width: 1024px) {
    width: 80px;
  }
`

const Bubble = styled.div`
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 600;
  padding-top: 1px;
  text-align: center;
  border-radius: 100%;
  color: white;
  background-color: rgba(25, 25, 25, .8);
  overflow: hidden;

  position: absolute;
  left: 61%;
  top: 17%;

  @media(max-width: 500px){
    width: 15px;
    height: 15px;
    font-size: 8px;
    left: 55%;
    top: 18%;
    padding-top: 2px;
  }


  @media(min-width: 500px) and (max-width: 600px){
    width: 18px;
    height: 18px;
    font-size: 10px;

    left: 55%;
    top: 18%;
    padding-top: 2px;
  }

  @media(min-width: 600px) and (max-width: 750px){
    width: 18px;
    height: 18px;
    font-size: 10px;

    left: 58%;
    top: 21%;
    padding-top: 2px;
  }

  @media(min-width: 1280px){
    width: 24px;
    height: 24px;
    padding-top: 2px;

    left: 60%;
    top: 15%;
  }
`

export default function MiniNav() {
  const { isAuthenticated, user } = useUser()
  const avatar = user?.user_metadata?.avatar;
    const avatarUrlOAuth = user?.user_metadata?.avatar_url;
  const { cartItems } = useCartItem();

  return (
    <nav>
      <ul>
        <Li>
          <StyledNavLink to="/cart">
            <IoCart />
            <Bubble>{cartItems?.length}</Bubble>
          </StyledNavLink>
          <StyledNavLink to="/account">
            { isAuthenticated && (avatar || avatarUrlOAuth) ? <Img src={ avatar?.avatar || avatarUrlOAuth || ""} alt="User Avatar" />: <FaUserCircle /> }
          </StyledNavLink>
          {!isAuthenticated && (
              <StyledNavLink to="/login">
                <Button size="large">LOGIN</Button>
              </StyledNavLink> 
            )
          }
        </Li>
      </ul>
    </nav>
  );
}
