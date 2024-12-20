import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TestimonialCard = styled(motion.div)`
  background: ${props => props.theme.colors.lightGray};
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.04);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
`;

const QuoteIcon = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const TestimonialText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ClientDetails = styled.div``;

const ClientName = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ClientBusiness = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Stars = styled.div`
  color: ${props => props.theme.colors.secondary};
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const testimonials = [
  {
    text: "I was in a jam and needed quick funding for inventory. Full Send Funding came through with the capital I needed in just 24 hours. Their process was simple and straightforward.",
    name: "Michael R.",
    business: "Retail Store Owner",
    stars: 5
  },
  {
    text: "The team at Full Send Funding truly understands small business needs. They offered flexible terms that worked perfectly for my seasonal business model.",
    name: "Sarah L.",
    business: "Restaurant Owner",
    stars: 5
  },
  {
    text: "After being turned down by traditional banks, Full Send Funding provided the working capital we needed to expand our operations. Their service is exceptional.",
    name: "David K.",
    business: "Construction Company",
    stars: 5
  },
  {
    text: "The application process was quick and easy. Their team was professional and helped me every step of the way. I highly recommend their services.",
    name: "Jennifer M.",
    business: "Healthcare Provider",
    stars: 5
  },
  {
    text: "Full Send Funding helped us manage our cash flow during our busy season. Their daily payment structure made it easy to handle repayment.",
    name: "Robert P.",
    business: "Transportation Services",
    stars: 5
  },
  {
    text: "Outstanding service and quick funding. They understood our business needs and provided the perfect funding solution. Will definitely work with them again.",
    name: "Lisa T.",
    business: "Hospitality Business",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Client Testimonials</Title>
          <Subtitle>
            See what our clients have to say about their experience working with Full Send Funding
          </Subtitle>
        </Header>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Stars>
                {[...Array(testimonial.stars)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </Stars>
              <QuoteIcon>
                <FaQuoteRight />
              </QuoteIcon>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <ClientInfo>
                <ClientDetails>
                  <ClientName>{testimonial.name}</ClientName>
                  <ClientBusiness>{testimonial.business}</ClientBusiness>
                </ClientDetails>
              </ClientInfo>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </Section>
  );
};

export default Testimonials; 