import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHandshake, FaMoneyBillWave, FaChartLine, FaClock, FaHeadset, FaBullhorn } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import { Link } from 'react-router-dom';

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

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const BenefitCard = styled(motion.div)`
  background: ${props => props.theme.colors.lightGray};
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const BenefitDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled(motion.div)`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const CTAButton = styled(Link)`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const benefits = [
  {
    icon: <FaMoneyBillWave />,
    title: "Competitive Compensation",
    description: "Earn substantial commissions for every merchant you refer that gets funded."
  },
  {
    icon: <FaChartLine />,
    title: "Strong Conversion Rates",
    description: "Benefit from our high approval rates and efficient funding process."
  },
  {
    icon: <FaClock />,
    title: "Fast Turnaround Times",
    description: "Quick decisions and exceptionally fast closing times for your referrals."
  },
  {
    icon: <FaHeadset />,
    title: "Dedicated Support",
    description: "Get full access to your personal affiliate liaison for deal tracking and support."
  },
  {
    icon: <FaBullhorn />,
    title: "Marketing Support",
    description: "Receive marketing materials and ideas to help you succeed in merchant acquisition."
  },
  {
    icon: <FaHandshake />,
    title: "Direct Funding",
    description: "Work directly with a primary funder, ensuring faster processes and better terms."
  }
];

const Partner = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { data, error: submitError } = await supabase
        .from('partner_applications')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company_name: formData.companyName
          }
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: ''
      });
    } catch (err) {
      setError('There was an error submitting your application. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <Container>
        <Header>
          <Title>Become a Partner</Title>
          <Subtitle>
            Partner with Full Send Funding and earn competitive commissions on merchant referrals
          </Subtitle>
        </Header>

        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <IconWrapper>{benefit.icon}</IconWrapper>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>

        <ContactForm onSubmit={handleSubmit}>
          {success && (
            <SuccessMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Thank you for your application! We'll be in touch soon.
            </SuccessMessage>
          )}

          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              type="text" 
              id="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              type="text" 
              id="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              type="tel" 
              id="phone" 
              value={formData.phone}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="companyName">Company Name</Label>
            <Input 
              type="text" 
              id="companyName" 
              value={formData.companyName}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <CTAButton to="/apply">Get Started</CTAButton>
        </ContactForm>
      </Container>
    </Section>
  );
};

export default Partner; 