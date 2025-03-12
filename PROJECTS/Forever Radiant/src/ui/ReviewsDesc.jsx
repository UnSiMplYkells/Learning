import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 7rem auto 2rem;

  @media (width > 1200px){
    width: 80%;
  }

  @media (width < 1024px){
    margin: -4rem auto 5rem;
  }

  @media (width < 768px){ /*no need for margin because of gap in collectionmenuitem*/
    margin: 0 auto; 
    width: 90%;
    min-width: 400px;
  }

  @media (width < 540px){ /*no need for margin because of gap in collectionmenuitem*/
    width: 100%;
    min-width: 250px;
    margin-bottom: 4rem;
  }
`;

const TabList = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  width: fit-content;
  border: 1px solid #e5e7eb;
`;

const TabButton = styled.h4`
  padding: 0.5rem 1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
`;

const Content = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  max-height: 500px; 
  overflow: scroll;

  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }

  @media (width < 540px){
    max-height: 350px; 
    font-size: 1.3rem;
  }
`;

export default function ReviewsDesc({item}) {
const [activeTab, setActiveTab] = useState('description');

return (
<Container>
    <TabList>  {/* ul*/}
        <Tab active={activeTab==='description' }> {/*li*/}
            <TabButton active={activeTab==='description' } onClick={()=> setActiveTab('description')}>
                Description
            </TabButton>
        </Tab>
        <Tab active={activeTab==='reviews' }> {/*li*/}
            <TabButton active={activeTab==='reviews' } onClick={()=> setActiveTab('reviews')}>
                Reviews
            </TabButton>
        </Tab>
    </TabList>
    <Content>
        {activeTab === 'description' && (
        <div>
          <p>
            {item.description} lorem Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a typeface12. It
            is based on a scrambled section of a Latin text by Cicero, with words altered, added, an
            d removed to make it nonsensical and improper3. It was introduced in the 1950s in the form of
            Letraset typeface specimens3. It is the standard placeholder text of the printing and publishing i
            ndustrieLorem ipsum is a placeholder text commonly used to demonstrate the visual form of a docum
            ent or a typeface12. It is based on a scrambled section of a Latin text by Cicero, with words alt
            ered, added, and removed to make it nonsensical and improper3. It was introduced in the 1950s i
            n the form of Letraset typeface specimens3. It is the standard placeholder text of the printing
            and publishing industrieLorem ipsum is a placeholder text commonly used to demonstrate the 
            visual form of a document or a typeface12. It is based on a scrambled section of a Latin te
            xt by Cicero, with words altered, added, and removed to make it nonsensical and improper3
            . It was introduced in the 1950s in the form of Letraset typeface specimens3. It is th
            e standard placeholder text of the printing and publishing industrieLorem ipsum i
            s a placeholder text commonly used to demonstrate the visual form of a document 
            or a typeface12. It is based on a scrambled section of a Latin text by Cic
            ero, with words altered, added, and removed to make it nonsensical and 
            improper3. It was introduced in the 1950s in the form of Letraset t
            ypeface specimens3. It is the standard placeholder text of the is the st
            printing and publishing industrieLorem ipsum is a placeholder text commo
            nly used to demonstrate the visual form of a document or a typeface12. It is base
            d on a scrambled section of a Latin text by Cicero, with words altered, added, and removed to make i
            t nonsensical and improper3. It was introduced in the 1950s in the form of Letraset typeface specimens3. 
            It is the standard placeholder text of the printing and publishing industrieLorem ipsum is a placeholder tex
            t commonly used to demonstrate the visual form of a document or a typeface12. It is based on a scrambled sectio
            n of a Latin text by Cicero, with words altered, added, and removed to make it nonsensical and improper
            3. It was introduced in the 1950s in the form of Letraset typeface specimens3. It is the standard pl
            aceholder text of the printing and publishing industrieLorem ipsum is a placeholder text commonly us
            ed to demonstrate the visual form of a document or a typeface12. It is based on a scrambled sectio
            n of a Latin text by Cicero, with words altered, added, and removed to make it nonsensical and i
            mproper3. It was introduced in the 1950s in t. It 
            he form of Letraset typeface specimens3 andard placeholder text of the printing 
            nd publishing industrieLorem ipsum is a placehold
            er text commonly used to demonstrate the visual for
            m of a document or a typeface12. It is based on a scrambl
            ed section of a Latin text by Cicero, with words altered, added
            , and removed to make it nonsensical and improper3. It was introduced 
            in the 1950s in the form of Letraset typeface specimens3. It is the standard
            placeholder text of the printing and publishing industrie
          </p>
        </div>

        )}
        {activeTab === 'reviews' && (
        <div>
            null
        </div>
        )}
    </Content>
</Container>
);
}