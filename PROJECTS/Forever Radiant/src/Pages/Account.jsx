import { useState } from "react";
import styled from "styled-components";
import Logout from "../Features/Authentication/Logout";
import UpdateUserPassword from "../Features/Authentication/UpdateUserPassword";
import UpdateUserDetails from "../Features/Authentication/UpdateUserDetails";

const Container = styled.div`
  max-width: 70%;
  margin: auto;

  @media (max-width: 600px) {
    max-width: 100%;
  }

  @media (min-width: 1024px) {
    max-width: 60%;
  }

  @media (min-width: 1440px) {
    max-width: 800px;
  }
`;

export default function Account() {
  return (
    <>
      <Container>
        <Logout />
        <UpdateUserDetails />
        <UpdateUserPassword />
      </Container>
    </> 
  );
}
