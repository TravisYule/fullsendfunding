import React, { useState, useEffect } from 'react';
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

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [value, inView]);

  return <span ref={ref}>{count}</span>;
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
            <AnimatedNumber value={100} /> Million
          </Title>
          <Subtitle>Delivered to small businesses</Subtitle>
        </AccoladeItem>

        <AccoladeItem>
          <Icon><FaAward /></Icon>
          <Title>#1 Funding</Title>
          <Subtitle>Funding since 2021</Subtitle>
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