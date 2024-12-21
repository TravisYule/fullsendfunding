import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useReanimateOnScroll } from '../../hooks/useReanimateOnScroll';

const Section = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Step = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
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
`;

const StepContent = styled(motion.div)`
  flex: 1;
`;

const ProcessTimeline = () => {
  const [ref, controls] = useReanimateOnScroll(0.2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0,
      x: -100,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const numberVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
      scaleX: 0.5
    },
    visible: { 
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

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
        <Timeline
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <Step key={step.number} variants={stepVariants}>
              <StepNumber variants={numberVariants}>
                {step.number}
              </StepNumber>
              <StepContent variants={contentVariants}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </StepContent>
            </Step>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
};

export default ProcessTimeline; 