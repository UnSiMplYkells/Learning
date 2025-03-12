import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: rgb(248, 248, 248);
  border-top: 5px  ridge rgb(146, 172, 143);
  font-size: 1.2rem;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 40px;

  @media (max-width: 600px){
    flex-direction: column;
    gap: 20px;
  }

  li{
    padding-top: 5px;
  }

  a{
    color: black;
  }
`

const WriteUp = styled.p`
  max-width: 400px;

  @media (max-width: 600px){
    width: fit-content;
  }

  @media (min-width: 600px) and (max-width: 690px)  {  
    max-width: 250px;
  }

  @media (min-width: 690px) and (max-width: 800px) {  
    max-width: 300px;
  }

  @media (min-width: 1024px) and (max-width: 1300px) {  
    max-width: 600px;
  }

  @media (min-width: 1300px){
    max-width: 800px;
  }
`

const ReachOut = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 15px 0 20px;

  p{
    font-size: 1.5rem;
    font-weight: 500;
    padding: 5px 0 10px;
    text-align: center
  }
`

const SocialHandles = styled.ul`
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  
  li{
    border: 1px solid black;
    padding: 8px 10px 5px;
    border-radius: 5px;
    transition: all 0.5s;

    &:hover {
      background-color: rgba(223, 223, 223, 0.73);
    }
  }

  a{
    color: black;

    & svg {
      width: 35px;
      height: 35px;
      transition: all 0.3s;
    }

    &:hover svg {
      transform: scale(1.15);
    }
  }
`

const Copyright = styled.p`
  font-size: 13px;
  text-align: center;
  padding: 8px 0 3px;
  border-top: 1px solid red; 
  background-color: rgb(209, 209, 209);

  @media (max-width: 400px){
    font-size: 11px;
  }
`

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Container>
        <WriteUp>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </WriteUp>
        <ul>
          <h3>COMPANY</h3>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><a href="/privacyPolicy" target="_blank" rel="noopener noreferrer" >Privacy policy</a></li>
        </ul>
        <ul>
          <h3>CONTACT US @</h3>
          <li>foreveradiant@gmail.com</li>
          <li> Kells: +234 705-406-3595</li>
          <li> Unknown: +234 913-409-3236</li>
        </ul>
      </Container>
      <ReachOut>
        <p>Interact with us on social media:</p>
        <SocialHandles>
          <li><a href="https://www.instagram.com/_unsimplykells/?igsh=N3prenlwOWx6NjYw#" target="_blank" rel="noopener noreferrer" ><FaInstagram /></a></li>
          <li><a href="https://www.tiktok.com/@thehealer800?_t=ZM-8uF22kpQsnl&_r=1" target="_blank" rel="noopener noreferrer" ><FaTiktok /></a></li>
          <li><a href="https://x.com/theHealer800?t=itn8w0XAWljhKT3eCag4TA&s=09" target="_blank" rel="noopener noreferrer" ><FaTwitter /></a></li>
        </SocialHandles>
      </ReachOut>
      <Copyright>Copyright © {currentYear} @<i>UnSiMplYkells.dev</i> - All Rights Reserved.</Copyright>
    </FooterWrapper>
  )
}
