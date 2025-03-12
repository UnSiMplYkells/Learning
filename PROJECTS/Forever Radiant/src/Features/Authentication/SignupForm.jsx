import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import CustomInput from "../../ui/CustomInput";
import AlternateLogin from "../../ui/AlternateLogin";
import MiniLoader from "../../ui/MiniLoader";
import { useSignup } from "./useSignup";


export default function SignupForm({ setActiveTab }) {
  const { signup, isLoading } = useSignup(setActiveTab)
  const { register, handleSubmit,  formState: { errors }, reset } = useForm()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswords(newPassword, confirmPassword);
  }

  function handleConfirmPasswordChange(e) {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswords(password, newConfirmPassword);
  }

  function validatePasswords(pass, confirmPass) {
    if (confirmPass.length > 0 && pass !== confirmPass) {
      setError("Passwords do not match!");
    } else {
      setError(""); // Clear error when they match
    }
  }

  function onSubmitForm({email, fullName, password, confirmPassword}) {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      return;
    }

    signup(
      { email, fullName, password },
      {
        onSettled: () => {
          reset()
        },
        onError: (error) => {
          console.error("Signup error:", error);
          toast.error(error.message);
        }
      }
    )
  }

  return (
    <Container>
      <Header>Register</Header>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Avatar>
          <ImgWrapper>
            <Img src="/Images/dog-img.jpg" alt="avatar"/>
            {isLoading && <DisabledOverlay />}
          </ImgWrapper>
          <Upload disabled={isLoading}>Upload Image(not yet implemented)</Upload>
        </Avatar>

        <>
          <CustomInput 
            type="text" 
            id="email"
            disabled={isLoading}
            {...register("email", { pattern:
              { value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address"
              }
              }
            )}
          >
            Email address*
          </CustomInput>
          {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors?.email?.message}</p>}
        </>

        <CustomInput 
          type="text" 
          id="fullName"
          disabled={isLoading} 
          {...register("fullName")}
        >
          Fullname*
        </CustomInput>

        <>
          <CustomInput 
            type="password" 
            id="password"
            disabled={isLoading} 
            {...register("password", {
              onChange: (e) => handlePasswordChange(e),
              minLength:{
                value: 8,
                message: "Password needs a minimum of 8 characters"
              }
            })}
          >
            Password*
          </CustomInput>
          { password.length < 8 && <p style={{ color: "rgb(238, 16, 16)", fontSize: "10px" }}>Minimum 8 characters</p>}

          <CustomInput 
            type="password" 
            id="confirmedPassword"
            disabled={isLoading} 
            {...register("confirmPassword", { onChange: (e) => handleConfirmPasswordChange(e),})}
          >
            Confirm Password
          </CustomInput>
          {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
        </>
        <T_C>
          <CustomInput type="checkbox" disabled={isLoading}/>
          <p><i>By clicking, you agree to our Terms and Conditions.</i></p>
        </T_C>
        
        <StyledButton size="large" variation="cart" disabled={isLoading}>{isLoading ? <MiniLoader /> : " SIGN UP"}</StyledButton>

      </form>
      <hr />
      <AlternateLogin type="signup"/>
    </Container>
  )
};

const Container = styled.div`
  max-width: 60%;
  margin: auto;

  @media (max-width: 620px) {
    max-width: 80%;
  }
`

const Header = styled.p`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  padding-top: 20px;

  @media (max-width: 820px){
    font-size: 1.5em; 
  }

  @media (min-width: 820px){
    font-size: 2em; 
  padding-top: 0;
  }
`;

const Avatar = styled.div`
  width: fit-content;
  margin: 15px auto 30px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Img = styled.img`
  border-radius: 100%;

  @media (max-width: 500px){
    width: 90px;
  } 

  @media (min-width: 500px){
    width: 120px;
  } 
`

const ImgWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DisabledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(200, 200, 200, 0.5); /* Grayish overlay */
  cursor: not-allowed;
  border-radius: 100%; /* Adjust if image is not circular */

  @media (max-width: 500px){
    width: 90px;
    height: 90px;
  } 

  @media (min-width: 500px){
    width: 120px;
    height: 120px;
  } 
`;

const Upload = styled.button`
  padding: 2px; 
  cursor: pointer;
  background-color: transparent;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin: 30px 0; 
  position: relative;
  z-index: 2;
`

const T_C = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
  font-size: 1.2rem;

`
