import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import QuickApplicationForm from '../ApplicationForm/QuickApplicationForm';

const HeroContainer = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
  color: white;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem 1rem;
    text-align: center;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled(motion.div)`
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const QuickForm = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <Content>
        <HeroText
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroTitle>Business Funding Made Simple</HeroTitle>
          <p>Get funded up to $500,000 within 24 hours. No collateral required.</p>
          <ul>
            <li>Simple Application Process</li>
            <li>Quick Decisions</li>
            <li>Flexible Terms</li>
            <li>All Credit Types Welcome</li>
          </ul>
        </HeroText>
        <QuickForm
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <QuickApplicationForm />
        </QuickForm>
      </Content>
    </HeroContainer>
  );
};

export default Hero; 