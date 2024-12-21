import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDollarSign, FaFileAlt, FaClock, FaShieldAlt, FaThumbsUp, FaAward } from 'react-icons/fa';
import { useReanimateOnScroll } from '../../hooks/useReanimateOnScroll';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const HowItWorks = () => {
  const [ref1, controls1] = useReanimateOnScroll(0.2);
  const [ref2, controls2] = useReanimateOnScroll(0.2);

  return (
    <Section>
      <Container>
        <Header
          as={motion.div}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <Title>How It Works</Title>
        </Header>

        <ProcessSection>
          <ProcessTitle
            as={motion.h2}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Full Send Funding
          </ProcessTitle>
          
          <BenefitsGrid
            ref={ref1}
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={controls1}
          >
            {[
              { icon: <FaFileAlt />, title: "No Application Fee", text: "Free application process with no hidden fees or obligations" },
              { icon: <FaDollarSign />, title: "Transparent", text: "Clear terms and conditions with no hidden costs" },
              { icon: <FaClock />, title: "Approved in Less than 24 Hours", text: "Quick approval process with same-day funding available" },
              { icon: <FaShieldAlt />, title: "Secure", text: "Bank-level security protecting your information" },
              { icon: <FaThumbsUp />, title: "Bad Credit Ok", text: "We focus on your business performance, not your credit score" },
              { icon: <FaAward />, title: "A+ Rating", text: "Excellent reputation with the Better Business Bureau" }
            ].map((benefit, index) => (
              <BenefitCard
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon as={motion.div} variants={iconVariants}>
                  {benefit.icon}
                </Icon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitText>{benefit.text}</BenefitText>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </ProcessSection>

        <InfoSection
          ref={ref2}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls2}
        >
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