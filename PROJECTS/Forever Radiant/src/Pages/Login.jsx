import { useState } from 'react'
import { useMoveBack } from '../Hooks/useMoveBack';
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../Features/Authentication/LoginForm";
import SignupForm from "../Features/Authentication/SignupForm";
import CloseButton from "../ui/CloseButton"

const Wrapper = styled.div`
  width: 100vw; 
  min-height: 100vh;
  padding-top: 20px;
  background-color: #000000;
  background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: moveBackground 10s linear infinite;

  @keyframes moveBackground {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100px 100px;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding-top: 30px;
  width: 100%;
  max-width: 820px;
  min-height: 85vh;
  margin: 10px auto;
  background-color: #fffff0;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Tabs = styled.ul`
  width: fit-content;
  margin: auto;
  display: flex;
  padding: 5px; 
  background-color: rgb(230, 230, 230); 
`

const TabsButton = styled.li`
  cursor: pointer;
  padding: 8px 20px;
  font-weight:${({active}) => (active ? "800" : "500")} ;
  background-color:  ${({active}) => (active && "white")} ;
`

const Content = styled.div`
  flex: 1; 
`;

const Img = styled.img`
  width: 80px;
  margin: auto;
` 
const StyledCloseButton = styled(CloseButton)`
  position: absolute; 
  top: 4px; 
  left: 820px;
`

export default function Login() {
  const moveBack = useMoveBack();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState("login");
  
  return (
      <Wrapper>
        <StyledNavLink to="/home">
          <Img src="/Images/drklogo1.png" alt="login logo"/>
          <img src="/Images/drklogo2.png" alt="login logo"/>
        </StyledNavLink>
        
        <Container>
          <StyledCloseButton onClick={moveBack} hideOnLogin={pathname === "/login"}/>
          <Tabs>  
              <TabsButton active={activeTab==='login' }> 
                  <p active={activeTab==='login' } onClick={()=> setActiveTab('login')}>
                      Login
                  </p>
              </TabsButton>
              <TabsButton active={activeTab==='signup' }> 
                  <p active={activeTab==='signup' } onClick={()=> setActiveTab('signup')}>
                      Signup
                  </p>
              </TabsButton>
          </Tabs>
          <Content>
              {activeTab === 'login' && (
              <div>
                <LoginForm />
              </div>
              )}

              {activeTab === 'signup' && (
              <div>
                <SignupForm setActiveTab={setActiveTab}/>
              </div>
              )}
          </Content>
        </Container>
      </Wrapper>
  );
}
