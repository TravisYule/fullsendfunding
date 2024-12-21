import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';

const Section = styled.section`
  padding: 5rem 2rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.lightGray};
`;

const Container = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const LogoImage = styled.img`
  height: 80px;
  margin-bottom: 2rem;
`;

const Icon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const LoginButton = styled(Link)`
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

const AccountCreated = () => {
  return (
    <Section>
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LogoImage src={Logo} alt="Full Send Funding" />
        <Icon />
        <Title>Account Created Successfully!</Title>
        <Message>
          Your account has been created successfully. You can now log in using your email and password.
        </Message>
        <LoginButton to={window.location.pathname.includes('partner') ? '/partner-login' : '/customer-login'}>
          Go to Login
        </LoginButton>
      </Container>
    </Section>
  );
};

export default AccountCreated; 