import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDollarSign, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, parseCurrency } from '../../utils/formatters';
import { useReanimateOnScroll } from '../../hooks/useReanimateOnScroll';

const CalculatorContainer = styled.div`
  background: rgba(255, 75, 75, 0.03);
  padding: 3rem 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(255, 75, 75, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 75, 75, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(255, 75, 75, 0.15);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
    margin: 0;
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 75, 75, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem;
    font-size: 16px;
    -webkit-appearance: none;
    border-radius: 8px;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1.1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: top;
  
  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 75, 75, 0.1);
  }
`;

const CalculateButton = styled(motion.button)`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff3333;
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  text-align: center;
  border: 2px solid ${props => props.theme.colors.secondary};
`;

const EstimatedAmount = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Step = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.colors.secondary : '#ddd'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const NavigationButton = styled(motion.button)`
  flex: 1;
  background: ${props => props.secondary ? 'transparent' : props.theme.colors.secondary};
  color: ${props => props.secondary ? props.theme.colors.secondary : 'white'};
  border: ${props => props.secondary ? `2px solid ${props.theme.colors.secondary}` : 'none'};
  padding: 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.colors.secondary};
  border-top: 3px solid transparent;
  border-radius: 50%;
`;

const CalculatorContent = styled(motion.div)`
  width: 100%;
`;

const FundingCalculator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    monthlyRevenue: '',
    timeInBusiness: '',
    creditScore: '',
    purpose: '',
    ownerName: '',
    businessName: '',
    email: '',
    phone: '',
  });
  const [estimatedAmount, setEstimatedAmount] = useState(null);
  const [error, setError] = useState('');
  const [ref, controls] = useReanimateOnScroll(0.2);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const calculateFunding = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const monthlyRevenue = parseCurrency(formData.monthlyRevenue);
      
      if (isNaN(monthlyRevenue) || monthlyRevenue <= 0) {
        setError('Please enter a valid monthly revenue amount');
        return;
      }
      
      // Calculate funding amount (110% of monthly revenue)
      let baseAmount = parseFloat(monthlyRevenue) * 1.1;
      console.log('Base amount before rounding:', baseAmount);
      
      // Round to nearest 5k
      baseAmount = Math.round(baseAmount / 5000) * 5000;
      console.log('Base amount after rounding:', baseAmount);
      
      // Cap at 500k if needed
      const fundingAmount = Math.min(baseAmount, 500000);
      
      // Calculate total repayment with 20% simple interest
      const interestAmount = fundingAmount * 0.20;
      const totalRepayment = fundingAmount + interestAmount;
      
      // Calculate weekly payment (52 weeks in a year)
      const weeklyPayment = Math.round(totalRepayment / 52);

      // Update the result display
      setEstimatedAmount({
        fundingAmount,
        weeklyPayment,
        totalRepayment
      });
      
      console.log('Final calculations:', {
        fundingAmount,
        weeklyPayment,
        totalRepayment
      });
      
      nextStep();
    } catch (err) {
      console.error('Calculation error:', err);
      setError('There was an error calculating your funding. Please try again.');
      return;
    }
  };

  const handleMonthlyRevenueChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData({
      ...formData,
      monthlyRevenue: formatted
    });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // Store calculator data in localStorage
    localStorage.setItem('applicationData', JSON.stringify({
      ...formData,
      monthlyRevenue: parseCurrency(formData.monthlyRevenue),
      estimatedAmount: estimatedAmount
    }));
    // Navigate to full application
    navigate('/apply');
  };

  const goToStep = (stepNumber) => {
    if (stepNumber < step) {
      setStep(stepNumber);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Form>
            <InputGroup>
              <Label>Type of Business</Label>
              <Select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select business type</option>
                <option value="retail">Retail Store</option>
                <option value="restaurant">Restaurant/Bar</option>
                <option value="automotive">Automotive</option>
                <option value="construction">Construction/Contractor</option>
                <option value="healthcare">Healthcare/Medical</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="transportation">Transportation/Logistics</option>
                <option value="wholesale">Wholesale/Distribution</option>
                <option value="professional">Professional Services</option>
                <option value="salon">Beauty Salon/Spa</option>
                <option value="fitness">Fitness/Gym</option>
                <option value="hotel">Hotel/Hospitality</option>
                <option value="ecommerce">E-commerce</option>
                <option value="technology">Technology/IT</option>
                <option value="cleaning">Cleaning Services</option>
                <option value="landscaping">Landscaping</option>
                <option value="agriculture">Agriculture/Farming</option>
                <option value="entertainment">Entertainment/Events</option>
                <option value="education">Education/Training</option>
                <option value="other">Other Business Type</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Monthly Revenue</Label>
              <Input
                type="text"
                name="monthlyRevenue"
                placeholder="Enter average monthly revenue"
                value={formData.monthlyRevenue}
                onChange={handleMonthlyRevenueChange}
                required
              />
            </InputGroup>

            <ButtonGroup>
              <NavigationButton
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue <FaArrowRight />
              </NavigationButton>
            </ButtonGroup>
          </Form>
        );

      case 2:
        return (
          <Form>
            <InputGroup>
              <Label>Time in Business</Label>
              <Select
                name="timeInBusiness"
                value={formData.timeInBusiness}
                onChange={handleInputChange}
                required
              >
                <option value="">Select time in business</option>
                <option value="0-2">0-2 years</option>
                <option value="2+">2+ years</option>
                <option value="5+">5+ years</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Purpose of Funding</Label>
              <Select
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                required
              >
                <option value="">Select purpose</option>
                <option value="expansion">Business Expansion</option>
                <option value="equipment">Equipment Purchase</option>
                <option value="inventory">Inventory</option>
                <option value="working-capital">Working Capital</option>
                <option value="other">Other</option>
              </Select>
            </InputGroup>

            <ButtonGroup>
              <NavigationButton
                type="button"
                onClick={prevStep}
                secondary
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaArrowLeft /> Back
              </NavigationButton>
              <NavigationButton
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue <FaArrowRight />
              </NavigationButton>
            </ButtonGroup>
          </Form>
        );

      case 3:
        return (
          <Form onSubmit={calculateFunding}>
            <InputGroup>
              <Label>Business Name</Label>
              <Input
                type="text"
                name="businessName"
                placeholder="Enter business name"
                value={formData.businessName}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Owner Name</Label>
              <Input
                type="text"
                name="ownerName"
                placeholder="Enter owner name"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Credit Score Range</Label>
              <Select
                name="creditScore"
                value={formData.creditScore}
                onChange={handleInputChange}
                required
              >
                <option value="">Select credit score range</option>
                <option value="below-600">Below 600</option>
                <option value="600-650">600-650</option>
                <option value="650-700">650-700</option>
                <option value="700+">700+</option>
              </Select>
            </InputGroup>

            <ButtonGroup>
              <NavigationButton
                type="button"
                onClick={prevStep}
                secondary
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaArrowLeft /> Back
              </NavigationButton>
              <NavigationButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Your Estimate <FaCheck />
              </NavigationButton>
            </ButtonGroup>
          </Form>
        );

      case 4:
        return (
          <ResultContainer>
            <EstimatedAmount>
              <FaDollarSign />{estimatedAmount.fundingAmount.toLocaleString()}
            </EstimatedAmount>
            <p>Estimated Available Funding*</p>
            <div style={{ margin: '1.5rem 0' }}>
              <h3 style={{ color: props => props.theme.colors.primary, marginBottom: '0.5rem' }}>
                Estimated Weekly Payment: ${estimatedAmount.weeklyPayment.toLocaleString()}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                12-month term at 20% simple interest
              </p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Total Repayment: ${estimatedAmount.totalRepayment.toLocaleString()}
              </p>
            </div>
            <small>*Final approval and terms subject to underwriting review</small>
            
            <Form onSubmit={handleFinalSubmit}>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>

              <NavigationButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Funded Now <FaArrowRight />
              </NavigationButton>
            </Form>
          </ResultContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Section>
      <Container>
        <SectionTitle>Calculate Your Funding</SectionTitle>
        <SectionSubtitle>
          See how much funding you may qualify for in just a few simple steps
        </SectionSubtitle>
        
        <CalculatorContainer
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <StepIndicator>
            {[1, 2, 3, 4].map((i) => (
              <Step 
                key={i} 
                active={i <= step}
                onClick={() => goToStep(i)}
                style={{ 
                  cursor: i < step ? 'pointer' : 'default',
                  opacity: i <= step ? 1 : 0.5 
                }}
              />
            ))}
          </StepIndicator>

          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </CalculatorContainer>
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default FundingCalculator; 