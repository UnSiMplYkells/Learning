import styled from 'styled-components'
import { Link } from "react-router-dom";

const Div = styled.div `
  margin-bottom: 2000px;
`

const StyledLink = styled(Link)`
  padding: 10px 15px;
  background-color: cyan;
`

export default function Home() {

  return (
    <Div>
      <p>Hello home</p>
      <StyledLink to="/order"> MY ORDERS </StyledLink>
    </Div>
  )
}
