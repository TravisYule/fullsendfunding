import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaDollarSign, FaAward, FaShieldAlt } from 'react-icons/fa';

const BannerContainer = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.5rem 0;
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const AccoladeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 8px;

  &:hover {
    transform: translateY(-10px) scale(1.04);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.secondary};
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const CountingNumber = ({ end, duration = 2 }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
    >
      <motion.span
        initial={{ count: 0 }}
        animate={inView ? { count: end } : { count: 0 }}
        transition={{ duration }}
        onAnimationComplete={() => {}}
      >
        {({ count }) => Math.floor(count)}
      </motion.span>
    </motion.span>
  );
};

const AccoladeBanner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <AccoladeItem>
          <Icon><FaStar /></Icon>
          <Title>A+ Rating</Title>
          <Subtitle>with the Better Business Bureau</Subtitle>
        </AccoladeItem>

        <AccoladeItem>
          <Icon><FaDollarSign /></Icon>
          <Title>
            <CountingNumber end={100} /> Million
          </Title>
          <Subtitle>Delivered to small businesses</Subtitle>
        </AccoladeItem>

        <AccoladeItem>
          <Icon><FaAward /></Icon>
          <Title>Funding Since 2021</Title>
          <Subtitle>Fast and reliable business funding</Subtitle>
        </AccoladeItem>

        <AccoladeItem>
          <Icon><FaShieldAlt /></Icon>
          <Title>Security</Title>
          <Subtitle>Bank Level Security Provided</Subtitle>
        </AccoladeItem>
      </BannerContent>
    </BannerContainer>
  );
};

export default AccoladeBanner; 