import { useUser } from "../Authentication/useUser";
import { GoTrash } from "react-icons/go";
import { useDeleteCartItem } from "./useDeleteCartItem";
import styled from "styled-components";

const Div = styled.div`
  & svg {
    width: 28px;
    height: 28px;
    transition: all .2s ease-in;

    &:hover{
      transform: scale(1.2);
    }

    @media (max-width: 400px){
      width: 20px;
      height: 20px;
    }
  }
`

export default function DeleteItem({cartItemId}) {
  const { deleteCartItem } = useDeleteCartItem()
  const { user } = useUser();
  const userId = user?.id;

  function handleDelete() {
    deleteCartItem({userId, cartItemId});
  }

  return (
    <Div onClick={handleDelete}>
      <GoTrash />
    </Div>
  );
}