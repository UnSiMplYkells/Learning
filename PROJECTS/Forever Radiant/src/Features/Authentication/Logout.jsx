import { useLogout } from "./useLogout"
import Button from "../../ui/Button"
import MiniLoader from "../../ui/MiniLoader"
import styled from "styled-components"


const StyledButton = styled(Button)`
  width: 10rem;
  height: 4rem;
  font-size: 14px;
  position: absolute;
  left: 72%;

  @media (width < 500px) {
    width: 6rem;
    height: 3rem;
    font-size: 8px;
    padding: 0.3rem 0.6rem;
    left: 76%;
  }


  @media (min-width: 1440px) {
    left: 64%;
  }
`

export default function Logout() {
  const { logout , isLoading} = useLogout()

  return (
      <StyledButton 
        size="small" 
        variation="danger" 
        disabled={isLoading} 
        onClick={logout}
      >
        {isLoading ? <MiniLoader /> : "LOGOUT"}
      </StyledButton>
  )
}
