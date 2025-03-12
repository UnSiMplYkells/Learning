import styled, { css } from 'styled-components';
import { useLocation } from "react-router-dom";

const Parent = styled.div`
  ${({pathname}) =>
      pathname.startsWith("/productDetails") &&
      css`
        font-size: 2.2rem;
  `}
`

const Discount = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4rem;

  @media(width < 540px){
    gap: .2rem;

    ${({pathname}) =>
      pathname.startsWith("/productDetails") &&
      css`
        gap: 3rem;
    `}
  }

  @media(width < 350px){
    font-size: .8rem;
  }
`
const AltPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: .2rem;
  font-weight: 600;

  ${({pathname}) =>
    pathname.startsWith("/productDetails") &&
    css`
      gap: .5rem;
  `}
`
const Span = styled.span`
  font-size: 1rem;
  color: ${({type}) => (type === 'price' ? 'inherit' : 'red')};
  text-decoration: ${({ discount, variation }) => !discount ? (variation === "dashed" ? "line-through" : "") : ""}; /*checks if discount is present, if present and variation = dashed, strikesthroght the elem*/

  ${({pathname}) =>
      pathname.startsWith("/productDetails") &&
      css`
        font-size: 1.2rem;
  `}
`

const Only = styled.span`
  vertical-align: sub;
  font-size: 1rem;
  position: relative;
  bottom: 4px;

  ${({pathname}) =>
    pathname.startsWith("/productDetails") &&
    css`
      font-size: 1rem;
      bottom: 5px;
  `}
`

export default function Price({price, discount}){
  const { pathname } = useLocation();

  var discountedPrice = {price}
  if(discount >= 1){
    discountedPrice = Math.ceil(price - (price * (discount/100))) // convert discount to percentage, then multiply with price to get discount, then subtract from price to get discountedPrice
  }

  return(
    <Parent pathname={pathname}>
      { discount > 0 ?( 
        <Discount pathname={pathname}> 
          <AltPrice pathname={pathname}>
            <h4><Span pathname={pathname} type="price">NGN</Span>{discountedPrice}<Only pathname={pathname} >only</Only></h4>
            <Span pathname={pathname} type="price" variation="dashed">NGN{price}</Span>  {/* show price so it can be striked throught when discounted */}
          </AltPrice>
          <Span pathname={pathname}>-{discount}%</Span> {/*shows discount */}
        </Discount> 
          ):( 
        <h4><Span pathname={pathname} type="price">NGN</Span>{price}<Only pathname={pathname}>only</Only></h4>   /* show price when no discount */
      )}
    </Parent>
  )
}


