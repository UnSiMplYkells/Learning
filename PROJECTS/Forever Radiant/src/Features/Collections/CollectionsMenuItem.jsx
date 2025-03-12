import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDoNotDisturb } from "react-icons/md"
import Price from '../../ui/Price';

export default function CollectionsMenuItem({item}) {
  const {name, price, image_url:images, id, discount, available, created_at:dateCreated} = item;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentDate = new Date();
  const createdDate = new Date(dateCreated);
  const timeDiff = currentDate - createdDate;
  const daysDifference = timeDiff / (1000 * 3600 * 24);  // Convert the time difference to days (milliseconds to days)


  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length); // Cycle through all images
      }, 2000);
      return () => clearInterval(interval); // Clear interval on cleanup
    }
  }, [isHovered, images?.length]);


  return (
    <>
      { available !== 0 ? (
          <Linked to={`/productDetails/${item.id}`}>
            <MenuProduct>
              { daysDifference <= 14 && daysDifference >= 0 && <New><p>NEW</p></New> }
              <ImageWrapper
                onMouseEnter={() => setIsHovered(true)} // Pause on hover
                onMouseLeave={() => setIsHovered(false)} // Resume after hover
              >
                <Img src={images[currentIndex]} alt={`product image ${currentIndex + 1}`} />
              </ImageWrapper>
              <Details>
                <h5>{name} wdibe fbrby of8y woy fbo 8oyf wefouy</h5>
                <Price price={price} discount={discount}/>
              </Details>
            </MenuProduct>
          </Linked>
        ) : (
          <MenuProduct>
          <Div> 
            <MdDoNotDisturb />   
            <p>Out of Stock</p>
          </Div>
          { daysDifference <= 14 && daysDifference >= 0 && <New><p>NEW</p></New> }
          <ImageWrapper
            onMouseEnter={() => setIsHovered(true)} // Pause on hover
            onMouseLeave={() => setIsHovered(false)} // Resume after hover
          >
            <Img src={images[currentIndex]} alt={`product image ${currentIndex + 1}`} />
          </ImageWrapper>
          <Details>
            <h5>{name} wdibe fbrby of8y woy fbo 8oyf wefouy</h5>
            <Oos>Out of stock. Please check back later</Oos>
          </Details>
        </MenuProduct>
        )
      }
    </>
    
  )
}

const MenuProduct = styled.li`
  cursor: pointer;
  position: relative; 
  z-index: 1;
`

const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(41, 41, 41, 0.55);
  position: absolute; 
  z-index: 2;
  cursor: not-allowed;
  /* text-align: center;  */
  display: flex;
  align-items: center;
  justify-content: center; 
  color: white;
  gap: 6px;

  & svg{
    color: red;
    transform: scale(1.34);
  }
`

const New = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 2px 12px;
  border-radius: 100px;
  background-color: black;
  position: absolute;
  top: 2%;
  left: 3%;
  font-weight: bolder;
  color: white;
  font-size: 1.2rem;

  @media(width < 500px){
    font-size: 1rem;
    padding: 2px 10px;
  }
`
const ImageWrapper = styled.div`
  overflow: hidden;
`
const Img = styled.img`
  transition: transform 0.2s ease;

  &:hover{
    transform: scale(1.05);
  }
`
const Details = styled.div`
  margin: .8rem 0 0 .4rem;
  font-size: 2rem;
  text-transform: capitalize;

  @media(width < 540px){
    font-size: 1.4rem;
    padding: 2px 8px;
    margin: 0 ;
  }

  @media(min-width: 540px) and (max-width: 768px){
    font-size: 1.8rem;
    padding: 2px 10px;
    margin: .2rem 0 0 .2rem;
  }
`

const Oos = styled.p`
  font-size: 12px;
  text-transform: none;
`

const Linked = styled(Link)`
  color: inherit;
`
