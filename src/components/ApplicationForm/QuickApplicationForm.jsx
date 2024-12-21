import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { formatCurrency, parseCurrency } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { useReanimateOnScroll } from '../../hooks/useReanimateOnScroll';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
    margin-bottom: 0.75rem;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 1rem;
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

const QuickApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    monthlyRevenue: '',
    fundingAmount: '',
    industry: ''
  });

  const [ref, controls] = useReanimateOnScroll(0.1);

  const formVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMonthlyRevenueChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData({
      ...formData,
      monthlyRevenue: formatted
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store form data in localStorage
    localStorage.setItem('applicationData', JSON.stringify({
      ...formData,
      monthlyRevenue: parseCurrency(formData.monthlyRevenue)
    }));
    // Navigate to full application
    navigate('/apply');
  };

  return (
    <FormContainer
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={formVariants}
      onSubmit={handleSubmit}
    >
      <FormTitle>Get Funded in 24 Hours</FormTitle>
      
      <InputGroup>
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input
          type="text"
          id="ownerName"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
        <Input
          type="text"
          placeholder="Monthly Revenue"
          value={formData.monthlyRevenue}
          onChange={handleMonthlyRevenueChange}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="fundingAmount">Desired Funding Amount</Label>
        <Select
          id="fundingAmount"
          name="fundingAmount"
          value={formData.fundingAmount}
          onChange={handleChange}
          required
        >
          <option value="">Select Amount Needed</option>
          <option value="10000-50000">$10,000 - $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000-250000">$100,000 - $250,000</option>
          <option value="250000-500000">$250,000 - $500,000</option>
          <option value="500000+">$500,000+</option>
        </Select>
      </InputGroup>

      <SubmitButton
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Funded Now
      </SubmitButton>
    </FormContainer>
  );
};

export default QuickApplicationForm; 