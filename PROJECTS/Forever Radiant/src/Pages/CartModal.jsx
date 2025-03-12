import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import Price from '../ui/Price';
import Button from "../ui/Button";
import QuantityCounter from '../ui/QuantityCounter';
import CloseButton from "../ui/CloseButton"; // Import the new CloseButton component
import { useUser } from "../Features/Authentication/useUser";
import { useAddToCart } from "../Features/Cart/useAddToCart";
import { useAddToCart2 } from "../Features/Cart/useAddToCart";
import MiniLoader from "../ui/MiniLoader";

export default function CartModal({ isVisible, onClose, selectedProduct, productId }) {
  const [selectedVolume, setSelectedVolume] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showVolumeError, setShowVolumeError] = useState(false)
  const { addToCart, isATCart} = useAddToCart()
  const { addToCart2, isATCart2} = useAddToCart2()
  const { user } = useUser()
  const userId = user?.id
  const navigate = useNavigate()

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
  }

    return () => document.body.classList.remove("no-scroll");
  }, [isVisible]);


  const {
    name,
    price,
    image_url: images = [],
    discount,
    size,
    available
  } = selectedProduct;

  const volumeSize = Array.isArray(size) ? size : [size];

  function onAddToCart(){
    if (!selectedVolume){ 
      setShowVolumeError(true)  
      return 
    } else {
      addToCart(
        {productId, userId, quantity, selectedVolume},
        {onSettled: () => onClose()}
      )
    }
    setShowVolumeError(false);
  }

  function onBuyNow(e){
    if (!selectedVolume) {
      setShowVolumeError(true); 
      return
    } else {
      addToCart2(
        {productId, userId, quantity, selectedVolume},
        {onSuccess: () => navigate("/cart") }
      )
    }
  }

  // console.log("price", price)
  // console.log("discount", discount)
  // console.log("selectedVolume", selectedVolume)
  // console.log("first value of sizes", volumeSize[0])

  // const mainPrice = (price/volumeSize[0]) * selectedVolume
  // console.log("mainprice", mainPrice)

  return (
    <>

    <ModalBackdrop isVisible={isVisible}>
      <ModalContainer>
        <ModalBody>
          <CloseButton onClick={onClose} /> {/* Use the CloseButton here */}
          <Img src={images[1]} />
          <ModalContent>
            <Middle>
                <h2>{name}</h2>
                <Price price={price} discount={discount} />
                <div>
                <h3>Select Size</h3>
                  <VolumeOptionsContainer isATCart={isATCart}>
                    {volumeSize.length > 0 &&
                      volumeSize.map((volume, i) => (
                        <VolumeOption
                          key={i}
                          className={selectedVolume === volume ? 'selected' : ''}
                          onClick={() => {
                            setSelectedVolume(volume)
                            setShowVolumeError(false)
                          }}
                          isATCart={isATCart}
                        >
                          {volume}ml
                        </VolumeOption>
                      ))
                    }
                  </VolumeOptionsContainer>
                  {showVolumeError && <p style={{ color: "red" }}>Please select a volume size</p>}
                </div>
                <div>
                  <h3>Quantity</h3>
                  <QuantityCounter  available={available} setQuantity={setQuantity} isATCart={isATCart}/>
                </div>
            </Middle>
            <Lower>
                <Button size="large" variation="cart" onClick={onAddToCart} disabled={isATCart || isATCart2}>{ isATCart ? <MiniLoader /> : "ADD TO CART"}</Button>
                <Button size="large" variation="danger" onClick={onBuyNow} disabled={isATCart2 || isATCart}>{ isATCart2 ? <MiniLoader /> : "BUY NOW"}</Button>
            </Lower>
          </ModalContent>
        </ModalBody>
      </ModalContainer>
    </ModalBackdrop>
    </>
  );
}

const ModalBackdrop = styled.div`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  top: auto;
  background-color: whitesmoke;
  width: 100%;
  z-index: 2000;

  display: flex;
  flex-direction: column;

  transform: translateY(100%);
  animation: ${({ isVisible }) =>
    isVisible || 
      css`${slideUp} .5s ease forwards
  `};

  @media (width < 400px) and (height < 700px) {
    height: 96%;
  }

  @media (min-width: 400px) and (max-width: 540px) {
    height: 78%;
  }

  @media (min-width: 540px) and (max-width: 1024px) {
    height: 85%;
  }

  @media (min-width: 1024px){
    width: 75%;
    height: 85%;
    margin: 0 auto;
    left: 0;
    right: 0;

  }

  @media (min-width: 540px) and (max-width: 720px) and (min-height: 700px) and (max-height: 900px) {
    height: 85%;
  }

  @media (min-width: 900px) and (max-width: 1200px) and (min-height: 600px) and (max-height: 1000px) {
    height: 96%;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: 1024px){
    flex-direction: row;
    padding: 10px;
    gap: 20px;
  }
`;

const Img = styled.img`
  width: 100%; 
  max-height: 60%;
  object-fit: cover;
  object-position: 70% 0%;

  @media (min-width: 1024px){
    width: 60%; 
    max-height: 100%;
  }
`;

const ModalContent = styled.div`
  display: flex;
  height: 40%;
  flex-direction: column;
  font-size: 1.2rem;
  padding: 0 10px; 
  overflow-y: auto;

  @media (min-width: 1024px){
    width: 40%; 
    height: 100%;
    
  }
`;

const VolumeOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 5px 0 10px;

  cursor: ${({ isATCart }) => (isATCart ? "not-allowed" : "pointer")};
`;

const VolumeOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid rgb(222, 224, 225);
  background-color: ${({ isATCart }) => (isATCart ? "rgba(116, 116, 116, 0.79)" : "rgb(232, 233, 235)" )};
  cursor: pointer;
  pointer-events: ${({ isATCart }) => (isATCart ? "none" : "auto")};
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${({ isATCart }) => (isATCart && "rgb(232, 233, 235)")};
  }

  &.selected {
    border-color: rgb(245, 148, 92); 
  }
  
`;

const Middle = styled.div`
  flex: 1;
  margin: 2px 0 5px ;
  overflow-y: auto;
`;

const Lower = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: fit-content;
  padding: 8px 0;

  @media (min-width: 1024px){
    flex-direction: column;
    gap: 10px;
    align-items: center; 

    Button{
      width: 100%; 
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  @media (min-width: 1024px){
    width: 100%; 
  }
`
