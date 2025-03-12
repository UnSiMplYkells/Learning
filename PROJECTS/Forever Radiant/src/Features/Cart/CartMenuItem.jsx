import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux'
import { addCheckedItem, removeCheckedItem } from '../../store.js'
import { Link } from "react-router-dom";
import UpdateQuantity from "./UpdateQuantity";
import DeleteItem from "./DeleteCartItem";
import toast from "react-hot-toast";

export default function CartItem({item}) {
  const { products: { name, image_url=[], price, available}, quantity: itemQuantity, size, id: cartItemId, product_id} = item;
  const dispatch = useDispatch()

  const checkedItems = useSelector(state => state.cart.checkedItems)
  const isChecked = checkedItems.includes(cartItemId)

  function handleCheckboxChange(e) {
    const checked = e.target.checked
    if(checked) {
      dispatch(addCheckedItem(cartItemId))
    } else {
      dispatch(removeCheckedItem(cartItemId))
    }

    if(available < itemQuantity) return toast("Not enough quantity available")
  };

  return (
    <li>
      <ProductDetails  checked={isChecked}>
        <Details>
          <Input
            type="checkbox"
            id={cartItemId}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <Img src={image_url?.[0]} alt="product image"/>
          <Div>
            <Linked to={`/productDetails/${product_id}`}><p>{name}</p></Linked>
            <Div2>
              <p><span>NGN</span>{price}</p>
              <VolumeOption><p>{size}ml</p></VolumeOption>
            </Div2>
          </Div>
        </Details>
        <UpdateQuantity initialQuantity={itemQuantity} cartItemId={cartItemId} available={available}/>
        <DeleteItem cartItemId={cartItemId}/>
      </ProductDetails>
    </li>
  );
}

const ProductDetails = styled.div`
  border-top: 1px solid #3d6734;
  border-bottom: 1px solid #3d6734;
  padding: 10px 8px;

  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
  transition: all .2s ease-in;
  transform: scale(${({checked}) => (checked ? 1.01 : 1)});

  &:hover{
    transform: scale(1.01);
  }

    @media (max-width: 360px){
    gap: 5px;
  }

  @media (max-width: 500px){
    font-size: 12px;
    gap: 20px;
  }

  @media (min-width: 600px){
    padding: 20px 35px;
  }
`

const Details = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;

  @media (min-width: 600px){
    
  }
`

const Div = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Div2 = styled.div`
  width: 40%;

  display: flex;
  align-items: center;
  gap: 15px;

  span{
    font-weight: 600;
    font-size: 10px;
  }

  @media (max-width: 360px){
    gap: 5px;
  }
`

const VolumeOption = styled.div`
  padding: 8px 4px;
  border: 1px solid rgb(240, 240, 240);
  width: fit-content;

  @media (max-width: 600px){
    padding: 5px 5px;
    font-size: 12px;
  }
`;

const Img = styled.img`
  width: 60px;
  aspect-ratio: 1;

  @media (min-width: 500px){
    width: 90px;
  }
`

const Input = styled.input`
  border-radius: 100%;
  align-items:center;
  width: 18px;
  border: none;
  outline: none;
  margin-right: 15px;

  @media (max-width: 400px){
    margin-right: 0;
  }

  @media (min-width: 400px) and (max-width: 500px){
    margin-right: 5px;
  }

  @media (min-width: 600px){
    width: 22px;
  }
`

const Linked = styled(Link)`
  color: inherit;
`