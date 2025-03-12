import React from "react";
import styled from "styled-components";

const AboutUsContainer = styled.div`
  padding: 5px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-weight: 500;
  text-transform: uppercase;
  padding-bottom: 2rem;

  span {
    font-weight: 700;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;

  @media (min-width: 600px)  and (max-width: 940px){
    width: 60%;
    height: 500px;
  }

  @media (min-width: 940px){
    width: 40%;
  }
`;

const ImageSection = styled.div`
  @media (min-width: 600px){
    display: flex;
    gap: 30px;
    margin-bottom: 20px; 
  }
`;

const DiffSection = styled.div`
  margin-top: 20px;

  @media (min-width: 600px) and (max-width: 940px) {
    width: 40%;
  }

  @media (min-width: 940px) {
    width: 60%;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Mission = styled.h4`
  margin-bottom: 5px;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const WhyChooseUs = styled.div`
  display: flex;
  justify-content: space-between;



  @media (max-width: 600px) {
    flex-direction: column;

    border-bottom: 1px solid red;
    border-left: 1px solid red;
    border-right: 1px solid red;
  }

    @media (min-width: 600px) {
      flex-direction: row;

      border-top: 1px solid red;
      border-bottom: 1px solid red;
      border-left: 1px solid red;
  }
`;

const Reason = styled.div`
  flex: 1;
  padding: 20px;
  

  @media (max-width: 600px) {
    border-top: 1px solid red;
  }

  @media (min-width: 600px) {
    border-right: 1px solid red;
  }
`;

const ReasonTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ReasonText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

function AboutUs() {
  return (
    <AboutUsContainer>
      <Title>ABOUT <span>US_</span></Title>

      <ImageSection>
        <HeroImage
          src="/Images/dog-img.jpg" // Path to your hero image
          alt="About Us Hero"
        />
        <DiffSection>
          <Section>
            <Paragraph>
              Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
            </Paragraph>
            <Paragraph>
              Since our inception, we’ve worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
            </Paragraph>
          </Section>

          <Section>
            <Mission>Our Mission:</Mission>
            <Paragraph>
              Our mission at Forever is to empower customers with choice, convenience, and confidence. We’re dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </Paragraph>
          </Section>
        </DiffSection>
      </ImageSection>

      <Section>
        <Title>WHY <span>CHOOSE US_</span></Title>
        <WhyChooseUs>
          <Reason>
            <ReasonTitle>Quality Assurance:</ReasonTitle>
            <ReasonText>
              We meticulously select and vet each product to ensure it meets our stringent quality standards.
            </ReasonText>
          </Reason>
          <Reason>
            <ReasonTitle>Convenience:</ReasonTitle>
            <ReasonText>
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
            </ReasonText>
          </Reason>
          <Reason>
            <ReasonTitle>Exceptional Customer Service:</ReasonTitle>
            <ReasonText>
              Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
            </ReasonText>
          </Reason>
        </WhyChooseUs>
      </Section>
    </AboutUsContainer>
  );
}

export default AboutUs;