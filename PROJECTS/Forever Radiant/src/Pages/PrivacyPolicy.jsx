import React from "react";
import styled from "styled-components";

const PrivacyContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
`;

const List = styled.ul`
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
  margin-left: 20px;
  list-style: bullet;
`;

const ContactInfo = styled.p`
  font-weight: bold;
  margin-left: 20px;
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <Title>Forever Radiant Privacy Policy</Title>

      <p><strong>Effective as of:</strong>  26th February, 2024</p>

      <p>
        Welcome to <strong>Forever radiant</strong> ("we," "our," or "us"). 
        Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, 
        and protect your information when you visit our website <strong>[yourwebsite.com]</strong> and purchase our products.
      </p>

      <Section>
        <SubTitle>1. Information We Collect</SubTitle>

        <h3>A. Personal Information</h3>
        <List>
          <ListItem>Name</ListItem>
          <ListItem>Email address</ListItem>
          <ListItem>Phone number</ListItem>
          <ListItem>Billing and shipping address</ListItem>
          {/* <ListItem>Payment details (processed securely via third-party payment gateways)</ListItem> */}
        </List>

        <h3>B. Non-Personal Information</h3>
        <List>
          <ListItem>Browser type</ListItem>
          <ListItem>IP address</ListItem>
          <ListItem>Pages visited</ListItem>
          <ListItem>Time spent on our website</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>2. How We Use Your Information</SubTitle>
        <List>
          <ListItem>Processing and fulfilling orders</ListItem>
          <ListItem>Sending order confirmations and updates</ListItem>
          <ListItem>Providing customer support</ListItem>
          <ListItem>Personalizing your shopping experience</ListItem>
          {/* <ListItem>Sending promotional emails (if opted in)</ListItem> */}
          <ListItem>Improving our website and services</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>3. How We Share Your Information</SubTitle>
        <p>We do <strong>not</strong> sell or rent your personal information. However, we may share it with:</p>
        <List>
          <ListItem><strong>Service providers</strong> (payment processors, shipping partners, and marketing platforms)</ListItem>
          <ListItem><strong>Legal authorities</strong> (if required by law)</ListItem>
          <ListItem><strong>Business transfers</strong> (if we merge, sell, or transfer parts of our business)</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>4. Data Security</SubTitle>
        <p>We implement security measures to protect your data. However, no online transaction is 100% secure. Please use caution when sharing personal information.</p>
      </Section>

      <Section>
        <SubTitle>5. Cookies and Tracking Technologies</SubTitle>
        <p>We use cookies and similar technologies to:</p>
        <List>
          <ListItem>Improve website functionality</ListItem>
          <ListItem>Track user behavior and preferences</ListItem>
          <ListItem>Provide targeted ads (via third-party advertisers like Google and Facebook)</ListItem>
        </List>
        <p>You can manage cookie preferences in your browser settings.</p>
      </Section>

      <Section>
        <SubTitle>6. Your Rights and Choices</SubTitle>
        <p>Depending on your location, you may have the right to:</p>
        <List>
          <ListItem>Access, update, or delete your personal data</ListItem>
          <ListItem>Opt out of marketing emails (unsubscribe link included in emails)</ListItem>
          <ListItem>Disable cookies through your browser</ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>7. Third-Party Links</SubTitle>
        <p>Our website may contain links to third-party sites. We are not responsible for their privacy practices.</p>
      </Section>

      <Section>
        <SubTitle>8. Changes to This Policy</SubTitle>
        <p>We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
      </Section>

      <Section>
        <SubTitle>9. Contact Us @</SubTitle>
        <ContactInfo>
          FOREVER RADIANT <br />
          foreveradiant@gmail.com <br />
          +234 913-409-3236 <br />
          address: null
        </ContactInfo>
      </Section>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
