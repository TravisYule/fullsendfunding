import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useReanimateOnScroll } from '../../hooks/useReanimateOnScroll';

const Section = styled.section`
  padding: 4rem 2rem;
  background: ${props => props.theme.colors.lightGray};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const QualificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const QualificationCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const Icon = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const QualificationTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const QualificationText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const QualificationSection = () => {
  const [ref, controls] = useReanimateOnScroll(0.3);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section>
      <Container>
        <Title>Qualifications for Business Funding</Title>
        <QualificationGrid>
          <QualificationCard
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={cardVariants}
          >
            <Icon><FaCheckCircle /></Icon>
            <QualificationTitle>3+ Months in Business</QualificationTitle>
            <QualificationText>
              You must be operating and generating revenue for at least 3 months
            </QualificationText>
          </QualificationCard>

          <QualificationCard
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Icon><FaCheckCircle /></Icon>
            <QualificationTitle>$10,000 / Month Gross Sales</QualificationTitle>
            <QualificationText>
              You must have at least $10,000 per month in gross sales to qualify for a loan
            </QualificationText>
          </QualificationCard>

          <QualificationCard
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Icon><FaCheckCircle /></Icon>
            <QualificationTitle>Business Checking Account</QualificationTitle>
            <QualificationText>
              You must have and maintain a business checking account to qualify
            </QualificationText>
          </QualificationCard>
        </QualificationGrid>
      </Container>
    </Section>
  );
};

export default QualificationSection; 