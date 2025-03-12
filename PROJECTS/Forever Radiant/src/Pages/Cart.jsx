
import styled from 'styled-components';
import CartMenu from '../Features/Cart/CartMenu'
import CartTotal from '../Features/Cart/CartTotals';
import CartHeading from '../Features/Cart/CartHeading';

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`

export default function Cart() {

  return (
    <Container>
      <CartHeading />
      <CartMenu />
      <CartTotal />
    </Container>
  )
}
