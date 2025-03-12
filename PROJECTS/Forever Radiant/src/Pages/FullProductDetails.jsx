import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMoveBack } from '../Hooks/useMoveBack';
import Button from "../ui/Button";
import ReviewsDesc from "../ui/ReviewsDesc";
import Discipline from '../ui/CompanyDiscipline';
import Price from '../ui/Price';
import CollectionsMenuItem from '../Features/Collections/CollectionsMenuItem';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails, getProduct } from '../Services/apiProducts';
import CartModal from "./CartModal"
import Loader from '../ui/Loader';

const MainContainer = styled.div`
  width: 100%;

  @media (width < 768px){ /*for mobile devices*/
    display: flex;
    flex-direction: column;
    gap: 44rem;
  }

  @media (width < 540px){
    gap: 32rem;
  }
`;
const Container = styled.div`
  height: 500px;
  width: fit-content;
  margin: auto;
  margin-top: clamp(1rem, 2.5vw, 5rem); //main also has padding
  
  display: flex;
  gap: 6rem;

  @media (width < 820px){
    gap: 4rem;
  }

  @media (width < 768px){
    display: block;
  }
`;
const LeftColumn = styled.div`
  width: 60%;
  height: 100%;
  min-width: fit-content;

  display: flex;
  gap: 1.2rem;

  @media(width > 1024px){
    width: 550px;
  }

  @media (width < 1024px){
    width: 45%;
    height: 75%;
  }

  @media (min-width: 540px) and (max-width: 765px) {
    width: 55%;
    height: 95%;
  }

  @media (width < 540px){     /* not same with < 1024. do not change */
    width: 45%;
    height: 75%;
  }
`;
const LeftImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
const LeftImage = styled.img`
  width: 100%; 
  height: 32%; 
  cursor: pointer;
  border-bottom: ${({ isActive }) => (isActive && "2px solid grey" )};
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover,
  &:focus {
    transform: perspective(500px) translateZ(20px);
    outline: none;
  }
`;
const RightImageDisplay = styled.div`
  width: 80%;
  height: 100%;
`;
const RightImage = styled.img`
  width: 100%;
  height: 100%;
`;
const RightColumn = styled.div`
  height: 100%;
  width: 40%;
  min-width: 300px;
  margin: auto 0;
  text-transform: uppercase;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (width < 1024px){
    height: 80%;
    margin: 0 auto 8rem;
  }

  @media (width < 768px){
    height: 85%;
    width: 100%;
    margin: 0;
  }
`
const ProductDetails = styled.div`
  height: 70%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const NameAvailability = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  p{
    font-size: 10px;
    text-transform: capitalize;
    font-weight: 500;
    position: absolute;
    top: 21px; 
    text-align: center;
    color: red;
    padding-left: 3px;
  }
`
const MenuSection = styled.div`
  padding-top: 8rem;
`
const MenuHeading = styled.h2`
  font-weight: 500;
  width: fit-content;
  margin: 0 auto;
  text-transform: uppercase; 

  span{
    font-weight:700;
  }
`
const MenuContainer = styled.ul`
  display: grid; 
  gap: 3rem; /* Spacing between items */
  padding-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 2rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 4rem;
  }

  @media (min-width: 1200px) {
    width: 95%;
    margin: auto;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  
`;

export default function FullProductDetails() {
  const moveBack = useMoveBack();
  const { productId } = useParams();
  
  const { data: products} = useQuery({
    queryKey: ['products'],
    queryFn: getProduct,
    staleTime: 60 * 1000,
  });

  const { data: selectedProduct, isLoading, error } = useQuery({
    queryKey: ['productDetails', productId],
    queryFn: () => fetchProductDetails(productId),
    staleTime: 60 * 1000,
  });

  const [isModalVisible, setModalVisible] = useState(false);

function toggleModal() {
  setModalVisible((prev) => !prev); // Toggles the current state
}

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (selectedProduct?.image_url?.length > 0) {
      setActiveImage(selectedProduct.image_url[0]);
    }
  }, 
    [selectedProduct]
  );

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  if (!selectedProduct) {
    return (
      <>
        <button onClick={moveBack}> &larr; Go back</button>
        <h2>Product not found</h2>
      </>
    );
  }

  const {
    name,
    price,
    image_url: images = [],
    description,
    discount,
    available,
    category,
    id: product_id,
  } = selectedProduct;

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <MainContainer>
        <Container>
          <LeftColumn>  
            <LeftImageColumn>
              {images.length > 0 ? (
                images.map((image, i) => (
                  <LeftImage
                    key={image || i}
                    src={image}
                    alt="Product image"
                    isActive={activeImage === image}
                    onClick={() => setActiveImage(image)}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </LeftImageColumn>

            <RightImageDisplay>
              {activeImage && <RightImage src={activeImage} alt={activeImage.alt} />}
            </RightImageDisplay>
          </LeftColumn>
          <RightColumn>
            <ProductDetails>
              <NameAvailability>
                <h3>{name}<></></h3>
                <p>Hurry Up: {available} remaining</p>
              </NameAvailability>
              <Price price={price} discount={discount}/>
              <Button size="large" variation="cart" onClick={toggleModal}>ADD TO CART</Button>
            </ProductDetails>
            <Discipline />
          </RightColumn>
        </Container>
        <ReviewsDesc item={selectedProduct}/>
      </MainContainer>
      <MenuSection>
        <MenuHeading>Related <span>products_</span></MenuHeading>
        <MenuContainer onClick={handleScrollToTop}>
          {products && products.length > 0 ?
            products
              .filter((item) => item.category === `${category}`)
              .map((item, index) => (
                <CollectionsMenuItem key={index} item={item} />
              ))
            : <p>No related products available</p>
          }
        </MenuContainer>
      </MenuSection>

      <CartModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        selectedProduct={selectedProduct}
        productId={product_id}
      />
    </>
  )
}
