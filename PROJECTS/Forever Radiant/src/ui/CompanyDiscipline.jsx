import styled from 'styled-components';

const Disc = styled.div`
  height: 30%;
  font-size: 1.2rem;
  color: var(--color-grey-50);
  padding-top: 5rem;
  text-transform: capitalize;
  line-height: 1.2;
  border-top: .13rem solid grey;
  color: #7f3700;

  @media (width < 500px){
    padding-top: 3rem;
  }
`

export default function Discipline(){
  return(
    <Disc>  
      <p>100% Original product.</p>
      <p>Easy return and exchange policy within 7 days.</p>
      <p>Tees & c apply</p>
    </Disc>
  )
}