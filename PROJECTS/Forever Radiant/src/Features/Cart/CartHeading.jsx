import supabase from '../../Services/supabase';
import styled from 'styled-components';
import { useCartItem } from './useCartItems';
import { useDispatch, useSelector } from 'react-redux';
import { checkAllItems, clearCheckedItems } from '../../store';
import { useQueryClient } from '@tanstack/react-query';

const MenuHeading = styled.h2`
  font-weight: 500;
  text-transform: uppercase;
  padding-bottom: 2rem;

  span {
    font-weight: 700;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  padding-left: 10px;
  margin-bottom: 10px;

  @media(max-width: 450px){
    font-size: 12px; 
  } 
`

const Input = styled.input`
  width: 18px;
  border: none;
  outline: none;

  @media(max-width: 450px){
    width: 13px;
  } 
`

const SelectAll = styled.p`
  cursor: pointer;
`

const DeleteSelected = styled.p`
  cursor: pointer;

  &:hover{
    text-decoration: underline;
    color: blue;
  }
`

export default  function CartHeading(){
  const { cartItems } = useCartItem();
  const queryClient = useQueryClient();
  const checkedItems = useSelector(state => state.cart.checkedItems)
  const dispatch = useDispatch()

  function handleSelectAll(e) {
    if(e.target.checked) {
      const allIds = cartItems?.map(item => item.id) || []
      dispatch(checkAllItems(allIds))
    } else {
      dispatch(clearCheckedItems())
    }
  };

  async function handleDeleteAll() {
    if(checkedItems.length === 0) return
    
    const { error } = await supabase
      .from('cart')
      .delete()
      .in('id', checkedItems)
      
      if(error) throw error

    dispatch(clearCheckedItems())
    queryClient.invalidateQueries(['cart'])
    toast.success('Selected items deleted')
  };

  return(
    <>
      <MenuHeading>Your <span>Cart_</span> ({cartItems?.length}) </MenuHeading>
      <Wrapper>
        { cartItems?.length >= 2 &&
          <>
            <Input
              type="checkbox"
              checked={cartItems?.length > 0 && checkedItems.length === cartItems?.length}
              onChange={handleSelectAll}
            />
            <SelectAll onClick={handleSelectAll}>Select all items</SelectAll>
          </>
        }
        { checkedItems?.length < 2 ? null : (
          <>
            <p>|</p>
            <DeleteSelected onClick={handleDeleteAll} disabled={checkedItems.length === 0}>
              Delete Selected ({checkedItems.length})
            </DeleteSelected>
          </>
        )}
      </Wrapper>
    </>
  )
}