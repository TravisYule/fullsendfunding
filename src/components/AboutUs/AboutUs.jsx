import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaDollarSign, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { useReanimateOnScroll } from '../../hooks/useReanimateOnScroll';

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentBlock = styled(motion.div)`
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Text = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const StatTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const StatText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
`;

const LocationBlock = styled(motion.div)`
  margin: 4rem 0;
`;

const LocationContent = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0 -1rem;
  }
`;

const AboutUs = () => {
  const [ref1, controls1] = useReanimateOnScroll(0.2);
  const [ref2, controls2] = useReanimateOnScroll(0.2);

  const fadeInVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleInVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <Section>
      <Container>
        <motion.div
          ref={ref1}
          animate={controls1}
          initial="hidden"
          variants={fadeInVariants}
        >
          <ContentBlock>
            <Title>About Us</Title>
            <Subtitle>Smart Financing Alternative for Your Small Business</Subtitle>
            <Text>
              Full Send Funding is one of the nation's fastest-growing providers of small business loans, 
              helping numerous organizations with their capital needs. Our management team brings decades 
              of combined alternative lending experience, and as former small business owners ourselves, 
              we understand the challenges of running a small business.
            </Text>
            <Text>
              By offering funding against a business' future receivables, we help businesses that are 
              typically turned away by traditional banks obtain the working capital they need. Whether 
              it's for inventory, paying off tax liens, new hires, or making payroll, Full Send Funding 
              is your trusted alternative lending source.
            </Text>
          </ContentBlock>

          <ContentBlock>
            <Subtitle>Simple Application Process</Subtitle>
            <Text>
              We promise a remarkably seamless process to secure capital. Getting a lending decision 
              requires only a one-page application and your last three months of business bank statements. 
              If approved, we collect minimal additional documentation, and funding takes place within 24 hours. 
              No collateral is required.
            </Text>
          </ContentBlock>
        </motion.div>

        <motion.div
          ref={ref2}
          animate={controls2}
          initial="hidden"
          variants={scaleInVariants}
        >
          <LocationBlock>
            <LocationContent>
              <Subtitle>Our Unique Location</Subtitle>
              <Text>
                Unlike traditional financial institutions concentrated in crowded urban centers, 
                Full Send Funding proudly calls Saratoga Springs, New York home. Nestled at the 
                foothills of the majestic Adirondack Mountains, our location reflects our 
                different approach to business funding.
              </Text>
              <Text>
                The Adirondack Park, with its six million acres of protected wilderness, serves 
                as a daily reminder of the importance of stability, longevity, and sustainable 
                growth - principles we apply to our funding solutions. Our setting in historic 
                Saratoga Springs, known for its mineral springs and rich heritage, allows us to 
                maintain a clearer perspective on the real needs of American small businesses.
              </Text>
              <Text>
                Away from the fast-paced, often impersonal environment of big city financial 
                districts, we've created a more thoughtful, relationship-focused approach to 
                business funding. Our location enables us to maintain lower overhead costs, 
                savings we pass directly to our clients through more competitive rates and 
                flexible terms.
              </Text>
            </LocationContent>
          </LocationBlock>

          <StatsGrid>
            <StatCard>
              <StatIcon><FaCheckCircle /></StatIcon>
              <StatTitle>A+ Rating</StatTitle>
              <StatText>with the Better Business Bureau</StatText>
            </StatCard>

            <StatCard>
              <StatIcon><FaDollarSign /></StatIcon>
              <StatTitle>$100 Million+</StatTitle>
              <StatText>Delivered to small businesses</StatText>
            </StatCard>

            <StatCard>
              <StatIcon><FaChartLine /></StatIcon>
              <StatTitle>#1 Funding</StatTitle>
              <StatText>Fast and reliable business funding</StatText>
            </StatCard>

            <StatCard>
              <StatIcon><FaShieldAlt /></StatIcon>
              <StatTitle>Security</StatTitle>
              <StatText>Bank Level Security Provided</StatText>
            </StatCard>
          </StatsGrid>
        </motion.div>
      </Container>
    </Section>
  );
};

export default AboutUs; 