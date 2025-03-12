import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import MiniLoader from "../../ui/MiniLoader";
import Button from "../../ui/Button";
import { FaUserCircle } from "react-icons/fa";
import { useUpdateUserDetails, useUserDetailed } from "../../Services/apiUsers"
import { Link } from "react-router-dom";

export default function UpdateUserDetails() {
  const { user } = useUser();
  const { data: userDetailsItem } = useUserDetailed();
  const { register, handleSubmit, reset } = useForm();
  const [updateUserDetails, setUpdateUserDetails] = useState(false)

  const fullNameDisplay = user?.user_metadata?.fullName || user?.user_metadata?.full_name;
  const avatarUrl = user?.user_metadata?.avatar?.avatar || user?.user_metadata?.avatar_url;

  const [fullNameInput, setFullNameInput] = useState(fullNameDisplay);
  const [avatarFile, setAvatarFile] = useState(null);

  const { updateUser, isUpdating } = useUpdateUser();
  const { updatedUserDetails, isUpdatingUserDetails } = useUpdateUserDetails()
  const userId = user?.id

  const { address_I, phonenumber_I, address_II, phonenumber_II } = userDetailsItem || {}

  useEffect(() => {
    if (isUpdating || isUpdatingUserDetails) {
      setUpdateUserDetails(true);
    } else {
      setUpdateUserDetails(false);
    }
  }, [isUpdating, isUpdatingUserDetails]);

  useEffect(() => {
    setFullNameInput(fullNameDisplay);
  }, [fullNameDisplay]);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
  }

  function onSubmitForm({fullName, addressI, phoneNumberI, addressII, phoneNumberII}) {
    // Track if any updates were actually performed
    let updatesPerformed = false;

    // Handle profile updates
    const profileUpdateResult = handleProfileUpdate(fullName);
    if (profileUpdateResult) updatesPerformed = true;

    // Handle detail updates
    const detailUpdateResult = handleDetailUpdates(addressI, phoneNumberI, addressII, phoneNumberII);
    if (detailUpdateResult) updatesPerformed = true;

    if (!updatesPerformed) {
      toast("No changes detected");
    }

    reset();
    setUpdateUserDetails(false);
  }

  function handleProfileUpdate(newFullName) {
    const currentName = user?.user_metadata?.fullName || user?.user_metadata?.full_name;


    const hasNameChange = newFullName?.trim() !== currentName?.trim();
    const hasAvatarChange = avatarFile !== null;

    if (!hasNameChange && !hasAvatarChange) return false;

    updateUser({
      fullName: newFullName,
      avatar: avatarFile
    });

    return true;
  }

  function handleDetailUpdates(addressI, phoneNumberI, addressII, phoneNumberII) {
    const detailUpdates = {
      address_I: addressI?.trim(),
      phonenumber_I: phoneNumberI?.trim(),
      address_II: addressII?.trim(),
      phonenumber_II: phoneNumberII?.trim()
    };

    const cleanUpdates = Object.fromEntries(
      Object.entries(detailUpdates).filter(([_, v]) => v !== undefined && v !== '')
    );

    if (Object.keys(cleanUpdates).length > 0) {
      updatedUserDetails({
        userId,
        ...cleanUpdates,
      });
    } else {
      toast("No changes detected - details already exist");
    }
  }
  
  function handleFirstButton(e){
    e.preventDefault()
    setUpdateUserDetails(!updateUserDetails)
    reset()
    setFullNameInput(fullNameDisplay)
  }

  return (
    <>
        {updateUserDetails && <Div></Div>}
        <Header>
          <Heading>{updateUserDetails ? "Update User Details" : "User Details"}</Heading>
          <StyledLink to="/order"> MY ORDERS </StyledLink>
        </Header>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Form  updateUserDetails={updateUserDetails}>
            <Avatar>
              <Img_Button>
                <ImgWrapper>
                  {avatarUrl ? <Img src={ avatarUrl } alt="User Avatar" /> : <Svg><FaUserCircle /></Svg>}
                  { (!avatarUrl || isUpdating) && <DisabledOverlay />}
                  { updateUserDetails ? ( 
                      <Input
                        type="text"
                        id="fullName"
                        disabled={isUpdating}
                        {...register("fullName", {
                          value: fullNameDisplay // Directly tie to controlled state
                        })}
                        value={fullNameInput} // Controlled component
                        onChange={(e) => setFullNameInput(e.target.value)}
                      />
                    ) : (
                      <FullName>{fullNameDisplay}</FullName>
                    )
                  }
                </ImgWrapper>
                { updateUserDetails && (
                  <div disabled={isUpdating}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  
                  )
                }
              </Img_Button>
            </Avatar>

            <UserEmail>
              <EmailLabel>Email:</EmailLabel>
              <EmailValue>{user.email}</EmailValue>
            </UserEmail>

            <InputContainer>
              <Label htmlFor="addressI">Address I:</Label>
              {updateUserDetails ? ( 
                <Textarea
                  id="addressI"
                  disabled={isUpdating}
                  {...register("addressI")}
                  defaultValue={address_I || ""}
                  onChange
                />
                ) : (
                  !address_I ? (
                    <Textarea
                      id="addressI"
                      disabled={isUpdating}
                      {...register("addressI")}
                    />
                  ) : (
                    <p>{ address_I }</p>
                  )  
                )
              }
            </InputContainer>

            <InputContainer>
              <Label htmlFor="phoneNumberI">Phone number I:</Label>
              { updateUserDetails ? ( 
                <Input
                  type="number"
                  id="phoneNumberI"
                  disabled={isUpdating}
                  {...register("phoneNumberI")}
                  defaultValue={phonenumber_I || ""}
                />
                ) : (
                  !phonenumber_I ? (
                    <Input
                      type="number"
                      id="phoneNumberI"
                      disabled={isUpdating}
                      {...register("phoneNumberI", {
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Must be numbers only"
                        },
                        minLength:{
                          value: 12,
                          message: "Phone number must be at least 10 digits(after country code )"
                        },
                        maxLength:{
                          value: 15,
                          message: "Phone number cannot exceed 15 digits"
                        }
                      })}
                    />
                  ) : (
                    <p>{ phonenumber_I }</p>
                  )
                )
              }
            </InputContainer>

            <InputContainer>
              <Label htmlFor="addressII">Address II:</Label>
              {updateUserDetails ? ( 
                <Textarea
                  id="addressII"
                  disabled={isUpdating}
                  {...register("addressII")}
                  defaultValue={address_II || ""}
                />
                ) : (
                  !address_II ? (
                    <Textarea
                      id="addressII"
                      disabled={isUpdating}
                      {...register("addressII")}
                    />
                  ): (
                    <p>{ address_II }</p>
                  )
                )
              }
            </InputContainer>

            <InputContainer>
              <Label htmlFor="phoneNumberII">Phone number II:</Label>
              {updateUserDetails ? ( 
                <Input
                  type="number"
                  id="phoneNumberII"
                  disabled={isUpdating}
                  {...register("phoneNumberII")
                    
                  }
                  defaultValue={phonenumber_II || ""}
                />
                ) : (
                  !phonenumber_II ? (
                    <Input
                      type="number"
                      id="phoneNumberII"
                      disabled={isUpdating}
                      {...register("phoneNumberII",{
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Must be numbers only"
                        },
                        minLength:{
                          value: 12,
                          message: "Phone number must be at least 10 digits(after country code )"
                        },
                        maxLength:{
                          value: 15,
                          message: "Phone number cannot exceed 15 digits"
                        }
                      })}
                    />
                  ) : (
                    <p>{ phonenumber_II }</p>
                  )
                )
              }
            </InputContainer>

            <StyledButtons>
              {userDetailsItem && (
                <StyledButton1 size="large" variation="cart" disabled={isUpdating || isUpdatingUserDetails} onClick={handleFirstButton}>
                {updateUserDetails ? "CANCEL" : "EDIT"}  
              </StyledButton1>
              )}
              {userDetailsItem ? (
                  updateUserDetails && (
                    <StyledButton2 size="large" variation="cart" disabled={isUpdating || isUpdatingUserDetails}>
                      {isUpdating || isUpdatingUserDetails ? <MiniLoader /> : "SAVE"}
                    </StyledButton2>
                  )
                ) : (
                    <StyledButton2 size="large" variation="cart" disabled={isUpdating || isUpdatingUserDetails}>
                      {isUpdating || isUpdatingUserDetails? <MiniLoader /> : "SAVE"}
                    </StyledButton2>
                )
              }

            </StyledButtons>
          </Form>
        </form>
    </> 
  );
}

const Header = styled.div`
  display: flex;
  gap: 100px;
  align-items: flex-start;
`;

const Heading = styled.p`
  text-transform: uppercase;
  font-weight: bold;

  @media (max-width: 820px) {
    font-size: 1.5em;
  }

  @media (min-width: 820px) {
    font-size: 2em;
  }
`;

const StyledLink = styled(Link)`
  padding: 7px 15px;
  background-color: cyan;
`

const Form = styled.div`
  position: relative;
  margin-top: 5px;
  padding: 20px 25px;
  z-index: 5; 
  background-color: ${({ updateUserDetails }) => (updateUserDetails ? "whitesmoke" : "transparent")};

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Avatar = styled.div`
  margin: 10px auto;
`;

const Img_Button = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Img = styled.img`
  border-radius: 100%;
  aspect-ratio: 1;

  @media (max-width: 500px) {
    width: 150px;
  }

  @media (min-width: 500px) {
    width: 250px;
  }
`;

const DisabledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(148, 148, 148, 0.68); /* Grayish overlay */
  cursor: not-allowed;
  border-radius: 100%;
  aspect-ratio: 1;

  @media (max-width: 500px) {
    width: 150px;
  }

  @media (min-width: 500px) {
    width: 250px;
  }
`;

const Svg = styled.div`
  & svg{
    @media (max-width: 500px) {
      width: 130px;
      height: 130px;
    }
    @media (min-width: 500px) {
      width: 230px;
      height: 230px;
    }
}
`

const ImgWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const FullName = styled.p`
  width: 80%;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;

  @media (max-width: 500px) {
    width: 100%;
  }
`


const UserEmail = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr; /* Stack label and email value */
  }
`;

const EmailLabel = styled.p`
  font-weight: 500;
  white-space: nowrap;
`;

const EmailValue = styled.p`
  padding: 10px;
  width: 100%;
  
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  align-items: center;
  margin-top: 15px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;

    input, textarea {
      margin-left: 20px; 
      width: 95%;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: green;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const Textarea = styled.textarea`
  height: 60px;
  padding: 5px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: green;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  
  & > * {
    @media (max-width: 500px) {
      transform: scale(1.2);
    }
  }

  @media (max-width: 500px) {
    gap: 30px;
  }
`

const StyledButton1 = styled(Button)`
  width: fit-content;
  position: relative;
`;

const StyledButton2 = styled(Button)`
  width: fit-content;
  position: relative;
  background-color: blue;
`;

const Div = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.50);
  z-index: 2; 
  cursor: not-allowed;
`