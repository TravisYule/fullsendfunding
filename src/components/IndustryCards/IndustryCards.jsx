import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaStore, FaUtensils, FaTruck, FaTools, FaHotel, FaMedkit } from 'react-icons/fa';

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.colors.lightGray};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled.div`
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const IndustryTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const industries = [
  {
    icon: <FaStore />,
    title: 'Retail',
    description: 'Funding solutions for retail stores, boutiques, and specialty shops.'
  },
  {
    icon: <FaUtensils />,
    title: 'Restaurants',
    description: 'Capital for restaurants, cafes, and food service businesses.'
  },
  {
    icon: <FaTruck />,
    title: 'Transportation',
    description: 'Financing for trucking companies and transportation services.'
  },
  {
    icon: <FaTools />,
    title: 'Construction',
    description: 'Funding for contractors, builders, and construction companies.'
  },
  {
    icon: <FaHotel />,
    title: 'Hospitality',
    description: 'Solutions for hotels, motels, and hospitality businesses.'
  },
  {
    icon: <FaMedkit />,
    title: 'Medical',
    description: 'Funding for medical practices, clinics, and healthcare providers.'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const IndustryCards = () => {
  return (
    <Section>
      <Container>
        <SectionTitle>Industries We Serve</SectionTitle>
        <CardGrid>
          {industries.map((industry, index) => (
            <Card
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <IconWrapper>{industry.icon}</IconWrapper>
              <IndustryTitle>{industry.title}</IndustryTitle>
              <Description>{industry.description}</Description>
            </Card>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default IndustryCards; 