import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaWpforms, FaCheckCircle, FaHandshake, FaMoneyBillWave } from 'react-icons/fa';

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: ${props => props.theme.colors.lightGray};
  top: 30px;
  height: calc(100% - 60px);
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    left: 30px;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  position: relative;
  background: white;
  z-index: 2;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      flex-direction: row;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 1rem;
  }
`;

const IconBox = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
  z-index: 1;
`;

const Content = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 2rem;
  border-radius: 8px;
  flex: 1;
  max-width: calc(50% - 3rem);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: calc(100% - 90px);
  }
`;

const StepTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const steps = [
  {
    icon: <FaWpforms />,
    title: 'Simple Application',
    description: 'Fill out our quick online application in minutes.'
  },
  {
    icon: <FaCheckCircle />,
    title: 'Quick Review',
    description: 'We review your application and respond within hours.'
  },
  {
    icon: <FaHandshake />,
    title: 'Approval & Terms',
    description: 'Receive your approval and review flexible funding terms.'
  },
  {
    icon: <FaMoneyBillWave />,
    title: 'Get Funded',
    description: 'Get funds deposited into your account within 24 hours.'
  }
];

const TimelineContainer = styled.div`
  display: flex;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const TimelineStep = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
    margin-bottom: 1rem;
    border-left: 3px solid ${props => props.theme.colors.primary};
  }
`;

const ProcessTimeline = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>How It Works</SectionTitle>
        <Timeline>
          <TimelineLine />
          {steps.map((step, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <IconBox>{step.icon}</IconBox>
              <Content>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Content>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
};

export default ProcessTimeline; 