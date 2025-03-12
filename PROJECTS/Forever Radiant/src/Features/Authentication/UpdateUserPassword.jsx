import styled from "styled-components";
import supabase from "../../Services/supabase"
import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "../Authentication/useUpdateUser"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import MiniLoader from "../../ui/MiniLoader";
import Button from "../../ui/Button";
import { useLogout } from "./useLogout";


const Main = styled.div`
  margin-top: 30px; 
`

const Heading = styled.p`
  text-transform: uppercase;
  font-weight: bold;

  @media (max-width: 820px) {
    font-size: 1.2em;
  }

  @media (min-width: 820px) {
    font-size: 1.5em;
  }
`

const Form = styled.form`
  margin-top: 5px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  
`;

const InputWrapper = styled.div`
  margin-left: 5px; 

  display: flex;
  flex-direction: column;
  gap: 20px; 
  
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; 
`

const Input = styled.input`
  width: 50%;
  font-size: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
  margin-left: 10px;

  &:focus {
    border-color: green;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.8;
  }

  @media (max-width: 500px) {
    width: 85%;
  }
`;

const Label = styled.label`
  font-weight: 500;
  white-space: nowrap;
`;

const StyledButton = styled(Button)`
  width: fit-content;
  position: relative;
`;

export default function UpdateUserPassword(){
  const { register, handleSubmit,  formState: { errors }, reset } = useForm()
  const { user } = useUser();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser, isUpdating } = useUpdateUser()

  const { logout , isLoading} = useLogout()
  
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

async function onSubmitForm({ currentPassword, newPassword, confirmedPassword }) {
  if (newPassword !== confirmedPassword) {
    setError("Passwords do not match!");
    return null;
  } 

  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (error) {
    toast.error("Incorrect current password!");
    return;
  }

  await toast.promise(
    updateUser({ password: newPassword }),
    {
      loading: "Updating password...",
      success: "Password updated successfully!" ,
      error: "Failed to update password!",
    }
  );

  await logout();
  reset()
}

  return(
    <Main>
      <Heading>Update Password</Heading>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <InputWrapper>
          <Inputs>
            <Label htmlFor="password">Password:</Label>
            <Input 
              type="password" 
              id="password"
              disabled={isUpdating} 
              {...register("currentPassword")}
              required
            />
          </Inputs>

          <Inputs>
            <Label htmlFor="newPassword">New password:</Label>
            <Input 
              type="password" 
              id="newPassword"
              disabled={isUpdating} 
              {...register("newPassword", {
                onChange: (e) => handlePasswordChange(e),
                minLength:{
                  value: 8,
                  message: "Password needs a minimum of 8 characters"
                }
              })}
              required
            />
            { password.length < 8 && <p style={{ color: "rgb(238, 16, 16)", fontSize: "10px" }}>Minimum 8 characters</p>}
          </Inputs>
          
          <Inputs>
            <Label htmlFor="confirmedPassword">Confirm password:</Label>
            <Input 
              type="password" 
              id="confirmedPassword"
              disabled={isUpdating} 
              {...register("confirmedPassword", { onChange: (e) => handleConfirmPasswordChange(e)})}
              required
            />
            {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
          </Inputs>
        </InputWrapper>
        <StyledButton size="large" variation="cart" disabled={isUpdating}>
          {isUpdating ? <MiniLoader /> : "SAVE"}
        </StyledButton>
      </Form>
    </Main>
  )
}