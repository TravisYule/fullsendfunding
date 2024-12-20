import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDollarSign, FaFileAlt, FaClock, FaShieldAlt, FaThumbsUp, FaAward } from 'react-icons/fa';

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ProcessSection = styled.div`
  margin-bottom: 5rem;
`;

const ProcessTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled(motion.div)`
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-width: 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.04);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
`;

const Icon = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const BenefitText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const InfoSection = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 3rem;
  border-radius: 8px;
  margin-bottom: 4rem;
`;

const InfoTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const RequiredDocs = styled.div`
  margin-top: 3rem;
`;

const DocsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DocItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};

  &:before {
    content: "✓";
    color: ${props => props.theme.colors.secondary};
    font-weight: bold;
  }
`;

const ApplyButton = styled(motion.a)`
  display: inline-block;
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 2rem;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const HowItWorks = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>How It Works</Title>
        </Header>

        <ProcessSection>
          <ProcessTitle>Why Choose Full Send Funding</ProcessTitle>
          <BenefitsGrid>
            <BenefitCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Icon><FaFileAlt /></Icon>
              <BenefitTitle>No Application Fee</BenefitTitle>
              <BenefitText>Free application process with no hidden fees or obligations</BenefitText>
            </BenefitCard>

            <BenefitCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Icon><FaDollarSign /></Icon>
              <BenefitTitle>Transparent</BenefitTitle>
              <BenefitText>Clear terms and conditions with no hidden costs</BenefitText>
            </BenefitCard>

            <BenefitCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Icon><FaClock /></Icon>
              <BenefitTitle>Approved in Less than 24 Hours</BenefitTitle>
              <BenefitText>Quick approval process with same-day funding available</BenefitText>
            </BenefitCard>

            <BenefitCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Icon><FaShieldAlt /></Icon>
              <BenefitTitle>Secure</BenefitTitle>
              <BenefitText>Bank-level security protecting your information</BenefitText>
            </BenefitCard>

            <BenefitCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Icon><FaThumbsUp /></Icon>
              <BenefitTitle>Bad Credit Ok</BenefitTitle>
              <BenefitText>We focus on your business performance, not your credit score</BenefitText>
            </BenefitCard>

            <BenefitCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Icon><FaAward /></Icon>
              <BenefitTitle>A+ Rating</BenefitTitle>
              <BenefitText>Excellent reputation with the Better Business Bureau</BenefitText>
            </BenefitCard>
          </BenefitsGrid>
        </ProcessSection>

        <InfoSection>
          <InfoTitle>What is Alternative Business Funding?</InfoTitle>
          <InfoText>
            Full Send Funding wants to make sure you understand exactly the type of funding we provide. 
            We advance capital against your future receivables. This is not a loan, rather a business advance. 
            We are a private company that base our lending decisions on your business performance rather than 
            your credit score.
          </InfoText>
          <InfoText>
            There is significantly less paperwork involved and because we leverage technology we can underwrite 
            and fund your business in as little as 24 hours. We require <strong>No Collateral</strong>. We believe 
            transparency through this process is paramount, and look to build a strong relationship with you and 
            help get you to a point where you can access more traditional capital.
          </InfoText>
          <InfoText>
            The cost of capital and terms will vary depending on what our proprietary underwriting score dictates. 
            Cost of capital will be between 7.9% and 45% with terms ranging from 4 months to 3 years. Our approval 
            percentage is over 90%.
          </InfoText>

          <RequiredDocs>
            <InfoTitle>Required Documents for a Funding Decision</InfoTitle>
            <DocsList>
              <DocItem>3 months of your complete business bank statements</DocItem>
              <DocItem>Our 1 Page Application</DocItem>
            </DocsList>
          </RequiredDocs>

          <ApplyButton 
            href="/apply"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </ApplyButton>
        </InfoSection>
      </Container>
    </Section>
  );
};

export default HowItWorks; 