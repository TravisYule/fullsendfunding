import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.secondary};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ContactCard = styled(motion.div)`
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
`;

const Icon = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ContactTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    text-align: center;
  }
`;

const Note = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  margin-top: 3rem;
`;

const NoteTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const NoteText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Contact = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Contact Us</Title>
          <Subtitle>We'd Love To Hear From You</Subtitle>
          <Description>
            Full Send Funding's Customer Care representatives are available to answer any of your 
            questions or concerns. In case you have any query about our business funding program, 
            we can be reached at:
          </Description>
        </Header>

        <ContactGrid>
          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Icon><FaMapMarkerAlt /></Icon>
            <ContactTitle>Address Information</ContactTitle>
            <ContactInfo>
              10 Ashlor Drive<br />
              Middle Grove, New York
            </ContactInfo>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Icon><FaPhone /></Icon>
            <ContactTitle>Phone</ContactTitle>
            <ContactInfo>
              <a href="tel:518-312-0382">518-312-0382</a>
            </ContactInfo>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Icon><FaEnvelope /></Icon>
            <ContactTitle>Email</ContactTitle>
            <ContactInfo>
              <a href="mailto:travis@fullsendfunding.com">travis@fullsendfunding.com</a>
            </ContactInfo>
          </ContactCard>
        </ContactGrid>

        <Note>
          <NoteTitle>Note from Full Send Funding</NoteTitle>
          <NoteText>
            We welcome the opportunity to work with your business and hope to answer any and all 
            questions that you may have. We are open and transparent and value your time.
          </NoteText>
        </Note>
      </Container>
    </Section>
  );
};

export default Contact; 