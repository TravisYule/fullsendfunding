import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Step = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  position: relative;

  &:not(:last-child):after {
    content: '';
    position: absolute;
    left: 30px;
    top: 60px;
    bottom: -3rem;
    width: 2px;
    background: ${props => props.theme.colors.secondary};
    opacity: 0.3;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    &:not(:last-child):after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const StepNumber = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(255, 75, 75, 0.2);
`;

const StepContent = styled.div`
  flex: 1;
  padding-top: 0.5rem;
`;

const StepTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const ProcessTimeline = () => {
  const steps = [
    {
      number: "1",
      title: "Quick Application",
      description: "Fill out our simple online application in minutes"
    },
    {
      number: "2",
      title: "Fast Review",
      description: "Our team reviews your application within hours"
    },
    {
      number: "3",
      title: "Get Approved",
      description: "Receive multiple funding options tailored to your needs"
    },
    {
      number: "4",
      title: "Get Funded",
      description: "Get funds deposited into your account within 24 hours"
    }
  ];

  return (
    <Section>
      <Container>
        <Title>How It Works</Title>
        <Timeline>
          {steps.map((step, index) => (
            <Step
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <StepNumber
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                {step.number}
              </StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </Step>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
};

export default ProcessTimeline; 