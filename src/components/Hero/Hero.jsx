import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaClock, FaChartLine } from 'react-icons/fa';
import QuickApplicationForm from '../ApplicationForm/QuickApplicationForm';

const HeroContainer = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  color: white;
  margin-top: -118px;
  margin-bottom: -100px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem 0;
    text-align: center;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  position: relative;
  z-index: 2;
  padding: 0 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled(motion.div)`
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    
    p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const FeaturesList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 1.5rem 0;
    text-align: left;
    padding: 0 1rem;
  }
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  
  svg {
    margin-right: 1rem;
    color: ${props => props.theme.colors.secondary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    
    svg {
      font-size: 1.2rem;
      min-width: 24px;
    }
  }
`;

const QuickForm = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  color: ${props => props.theme.colors.text};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
    margin: 0 -1rem;
    border-radius: 8px;
  }
`;

const TrustIndicators = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    
    svg {
      font-size: 1rem;
    }
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  
  svg {
    color: ${props => props.theme.colors.secondary};
  }
`;

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: i => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const Hero = () => {
  const features = [
    { icon: <FaCheckCircle />, text: "Simple Application Process" },
    { icon: <FaClock />, text: "24-Hour Approval" },
    { icon: <FaChartLine />, text: "Flexible Terms" },
    { icon: <FaShieldAlt />, text: "All Credit Types Welcome" }
  ];

  return (
    <HeroContainer>
      <Content>
        <HeroText
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Business Funding Made Simple
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get funded up to $500,000 within 24 hours. No collateral required.
          </motion.p>
          
          <FeaturesList>
            {features.map((feature, i) => (
              <FeatureItem
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={featureVariants}
              >
                {feature.icon}
                {feature.text}
              </FeatureItem>
            ))}
          </FeaturesList>

          <TrustIndicators
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <TrustItem>
              <FaShieldAlt /> Bank-Level Security
            </TrustItem>
            <TrustItem>
              <FaCheckCircle /> A+ BBB Rating
            </TrustItem>
            <TrustItem>
              <FaChartLine /> 90% Approval Rate
            </TrustItem>
          </TrustIndicators>
        </HeroText>

        <QuickForm
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <QuickApplicationForm />
        </QuickForm>
      </Content>
    </HeroContainer>
  );
};

export default Hero; 