import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaClock, FaChartLine } from 'react-icons/fa';
import QuickApplicationForm from '../ApplicationForm/QuickApplicationForm';

const HeroContainer = styled.div`
  background: ${props => props.theme.colors.background.gradient};
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  color: white;
  margin-top: -118px;
  margin-bottom: -100px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 150%, rgba(107, 75, 138, 0.4) 0%, transparent 50%);
  }
  
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
  z-index: ${props => props.theme.zIndex.base + 1};
  padding: 0 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroText = styled(motion.div)`
  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing.lg};
    line-height: 1.2;
    font-weight: 700;
    background: linear-gradient(135deg, ${props => props.theme.colors.white} 0%, ${props => props.theme.colors.gray[200]} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    margin-bottom: ${props => props.theme.spacing.xl};
    opacity: 0.9;
    line-height: 1.6;
    color: ${props => props.theme.colors.gray[200]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    h1 {
      font-size: ${props => props.theme.fontSizes['2xl']};
      margin-bottom: ${props => props.theme.spacing.base};
      line-height: 1.3;
    }
    
    p {
      font-size: ${props => props.theme.fontSizes.base};
      margin-bottom: ${props => props.theme.spacing.lg};
    }
  }
`;

const FeaturesList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.xl} 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: ${props => props.theme.spacing.lg} 0;
    text-align: left;
    padding: 0 ${props => props.theme.spacing.base};
  }
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.base};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.gray[200]};
  
  svg {
    margin-right: ${props => props.theme.spacing.base};
    color: ${props => props.theme.colors.secondaryLight};
    font-size: ${props => props.theme.fontSizes.xl};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.base};
    margin-bottom: ${props => props.theme.spacing.sm};
    
    svg {
      font-size: ${props => props.theme.fontSizes.lg};
      min-width: 24px;
    }
  }
`;

const QuickForm = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: ${props => props.theme.colors.text.primary};
  box-shadow: ${props => props.theme.shadows.xl};
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.theme.colors.gray[200]};
  
  h2 {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin-bottom: ${props => props.theme.spacing.lg};
    text-align: center;
    font-weight: 700;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
    margin: 0 -1rem;
    border-radius: ${props => props.theme.borderRadius.lg};
  }
`;

const TrustIndicators = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing['2xl']};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.gray[700]};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.xl};
    padding-top: ${props => props.theme.spacing.lg};
    
    svg {
      font-size: ${props => props.theme.fontSizes.base};
    }
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[300]};
  
  svg {
    color: ${props => props.theme.colors.secondaryLight};
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