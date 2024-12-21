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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ReasonCard = styled(motion.div)`
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMore = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ReasonSection = () => {
  const [ref1, controls1] = useReanimateOnScroll();
  const [ref2, controls2] = useReanimateOnScroll();
  const [ref3, controls3] = useReanimateOnScroll();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section>
      <Container>
        <ReasonCard
          ref={ref1}
          animate={controls1}
          initial="hidden"
          variants={fadeInUp}
        >
          <Title>Reasons For Funding</Title>
          <Description>
            Companies today have many reasons for securing capital. While traditional bank loans may offer good terms, very few small businesses get approved. We provide alternative solutions with higher approval rates and faster funding.
          </Description>
          <ReadMore>READ MORE</ReadMore>
        </ReasonCard>

        <ReasonCard
          ref={ref2}
          animate={controls2}
          initial="hidden"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Title>Why You Should Apply</Title>
          <Description>
            Fast decisions, minimal documentation, and a frictionless process make our funding solutions ideal. Full Send Funding provides working capital to thousands of small businesses with quick and efficient approvals.
          </Description>
          <ReadMore>READ MORE</ReadMore>
        </ReasonCard>

        <ReasonCard
          ref={ref3}
          animate={controls3}
          initial="hidden"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Title>Help Your Business Succeed</Title>
          <Description>
            Every business requires capital for growth. Money provides the cash flow that's crucial for running a business. Having a reliable source for fast capital gives you a competitive advantage in today's market.
          </Description>
          <ReadMore>READ MORE</ReadMore>
        </ReasonCard>
      </Container>
    </Section>
  );
};

export default ReasonSection; 