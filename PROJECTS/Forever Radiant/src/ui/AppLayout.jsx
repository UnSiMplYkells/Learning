import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";

const Main = styled.main `
  position: relative;
  padding: 2rem 2rem 3.2rem;
  flex: 1;

  background-color: #ffffff;
  background-image: url("https://www.transparenttextures.com/patterns/worn-dots.png");

  animation: moveBackground 50s linear infinite alternate;

  @keyframes moveBackground {
    0% {
      background-position: 0 0;
    }
    25% {
      background-position: -30px 40px;
    }
    50% {
      background-position: 20px -50px;
    }
    75% {
      background-position: -40px 20px;
    }
    100% {
      background-position: 50px -30px;
    }
  } 
`
const Div = styled.div `
  max-width: 1700px;
  height: 100vh;
  margin: 0 auto;
  
  display: flex;
  flex-direction: column;
`

export default function AppLayout() {
  const location = useLocation();
  const hideFooter = location.pathname.includes("/account"); 

  return (
    <Div>
      <Header/>
      <Main>
        <Outlet/>
      </Main>
      {hideFooter || <Footer />}
    </Div>
  )
}
