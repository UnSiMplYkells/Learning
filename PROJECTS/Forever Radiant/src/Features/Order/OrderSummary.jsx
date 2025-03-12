import { useSelector } from "react-redux"
import { useCartItem } from "../Cart/useCartItems"
import styled, { css } from "styled-components";
import CartTotal from "../Cart/CartTotals";

export default function OrderSummary() {
  const { cartItems } = useCartItem();
  const checkedItems = useSelector((state) => state.cart.checkedItems);

  const checkedCartItems = cartItems?.filter((item) => 
    checkedItems.includes(item.id)
  );

  if (!checkedCartItems || checkedCartItems.length === 0) {
    return <p>No items selected</p>;
  }

  return (
    <>
      <OrderHeading>Order <span>Summary_</span></OrderHeading>
      <Wrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader $colQuantity>Quantity</TableHeader>
              <TableHeader>Size</TableHeader>
              <TableHeader>Price</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {checkedCartItems.map((item) => {
              const { id, products, quantity, size } = item;
              
              return (
                <TableRow key={id}>
                  <TableCell $name>{products.name}</TableCell>
                  <TableCell $quantity>{quantity}</TableCell>
                  <TableCell>{size}ml</TableCell>
                  <TableCell>₦{products.price}</TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
        <Div>
          <CartTotal />
        </Div>
      </Wrapper>
    </>
  );
}

const OrderHeading = styled.h2`
  font-weight: 500;
  text-transform: uppercase;
  margin: 18px 0;
  @media(max-width: 600px){
    margin: 10px 0 15px
  }

  span {
    font-weight: 700;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding-left: 10px;
  
  @media (min-width: 1100px){
    display: flex;
    align-items: center;
    gap: 45px;
  }
`

const Table = styled.table`
  width: 100%;
  font-size: 1em;
  border-bottom: 10px groove whitesmoke;
  margin-bottom: 30px;

  @media (max-width: 400px){
    font-size: 0.8em;
  }

  @media (min-width: 1100px){
    width: 60%;
  }
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 15px;
  background-color: whitesmoke;
  border-bottom: 2px solid #ddd;

    ${(props) =>
    props.$colQuantity &&
    css`
      padding: 12px 4px;
    `}
`;

const TableCell = styled.td`
  padding: 12px 10px;
  vertical-align: top;

    ${(props) =>
    props.$name &&
    css`
      @media(max-width: 400px){
        max-width: 100px;
      }
    `}

    ${(props) =>
    props.$quantity &&
    css`
      text-align: center;
    `}
`;

const Div = styled.div`
  @media (min-width: 1100px){
    width: 40%;
  }
`