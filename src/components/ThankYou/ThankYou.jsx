import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
`;

const Card = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Icon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.secondary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const ThankYou = () => {
  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Icon />
        <Title>Thank You!</Title>
        <Message>
          Your application has been successfully submitted. Our team will review your information 
          and contact you within 24 hours to discuss your funding options.
        </Message>
        <BackButton to="/">Return to Homepage</BackButton>
      </Card>
    </Container>
  );
};

export default ThankYou; 