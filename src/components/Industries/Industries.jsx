import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaStore, 
  FaUtensils, 
  FaTruck, 
  FaTools, 
  FaHotel, 
  FaMedkit,
  FaWarehouse,
  FaOilCan,
  FaGlassCheers
} from 'react-icons/fa';

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

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const IndustryCard = styled(motion.div)`
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-10px) scale(1.04);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
`;

const IndustryTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const IndustryDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const BulletItem = styled.li`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  &:before {
    content: "•";
    color: ${props => props.theme.colors.secondary};
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const industries = [
  {
    icon: <FaStore />,
    title: "Retail",
    description: "Supporting retail businesses with flexible funding solutions to manage inventory, expand locations, or upgrade equipment.",
    useCases: [
      "Inventory purchasing",
      "Store renovations",
      "Equipment upgrades",
      "Marketing campaigns",
      "Seasonal cash flow"
    ]
  },
  {
    icon: <FaUtensils />,
    title: "Restaurants",
    description: "Helping restaurants, cafes, and food service businesses thrive with quick access to working capital.",
    useCases: [
      "Kitchen equipment",
      "Inventory management",
      "Staff hiring & training",
      "Expansion projects",
      "Renovation costs"
    ]
  },
  {
    icon: <FaTruck />,
    title: "Transportation",
    description: "Providing essential funding for transportation and logistics companies to maintain and grow their operations.",
    useCases: [
      "Vehicle purchases",
      "Fleet maintenance",
      "Fuel costs",
      "Insurance coverage",
      "Driver training"
    ]
  },
  {
    icon: <FaTools />,
    title: "Construction",
    description: "Supporting construction companies with funding solutions for equipment, materials, and project management.",
    useCases: [
      "Equipment financing",
      "Material purchases",
      "Project bidding",
      "Payroll coverage",
      "Insurance costs"
    ]
  },
  {
    icon: <FaHotel />,
    title: "Hospitality",
    description: "Offering flexible funding options for hotels, motels, and hospitality businesses to enhance guest experiences.",
    useCases: [
      "Property improvements",
      "Staff training",
      "Marketing initiatives",
      "Technology upgrades",
      "Seasonal preparation"
    ]
  },
  {
    icon: <FaMedkit />,
    title: "Healthcare",
    description: "Providing medical practices and healthcare providers with funding for equipment, staffing, and operations.",
    useCases: [
      "Medical equipment",
      "Staff hiring",
      "Facility upgrades",
      "Technology systems",
      "Working capital"
    ]
  }
];

const Industries = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Industries We Serve</Title>
          <Subtitle>
            Full Send Funding provides flexible financing solutions across multiple industries, 
            understanding the unique challenges and opportunities each sector faces. Our expertise 
            allows us to offer tailored funding solutions that match your specific business needs.
          </Subtitle>
        </Header>

        <IndustriesGrid>
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <IconWrapper>{industry.icon}</IconWrapper>
              <IndustryTitle>{industry.title}</IndustryTitle>
              <IndustryDescription>{industry.description}</IndustryDescription>
              <BulletList>
                {industry.useCases.map((useCase, i) => (
                  <BulletItem key={i}>{useCase}</BulletItem>
                ))}
              </BulletList>
            </IndustryCard>
          ))}
        </IndustriesGrid>
      </Container>
    </Section>
  );
};

export default Industries; 