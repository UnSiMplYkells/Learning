import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../Services/apiProducts';
import CollectionsMenuItem from './CollectionsMenuItem';
import Loader from '../../ui/Loader';
import { useState } from 'react';

const MenuHeading = styled.h2`
  font-weight: 500;
  text-transform: uppercase;
  padding-bottom: 2rem;

  span {
    font-weight: 700;
  }

  @media (width < 500px) {
    padding-bottom: 0.8rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 0 3rem;
  }

  @media (min-width: 1200px) {
    padding-left: 4rem;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  select{
    height: fit-content;
    padding: 10px 15px;
  }
`

export default function CollectionsMenu() {
  const [ sorted, setSorted ] = useState()
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProduct,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: not available</div>;
  if (!products || products.length === 0) return <p>No products available</p>;


  function handleSorted(e){
    setSorted(e.target.value) 
  }

  const filteredProduct = products?.filter((item) => {
    if (sorted ===  "All") return true
    if (sorted === "haircare") return item.category === "haircare"
    if (sorted === "skincare") return item.category === "skincare"
    return true
  })

  return (
    <>
      <Div>
        <MenuHeading>All <span>collections_</span></MenuHeading>
        <select name="sort by category" onChange={handleSorted}>
          <option value="All">All</option>
          <option value="haircare">Haircare</option>
          <option value="skincare">skincare</option>
        </select>
      </Div>
      <MenuContainer>
        {filteredProduct
          .map((item, index) => (
            <CollectionsMenuItem key={index} item={item} />
          ))}
      </MenuContainer>
    </>
  );
}

const MenuContainer = styled.ul`
  display: grid;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
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
