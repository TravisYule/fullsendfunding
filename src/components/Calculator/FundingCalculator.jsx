import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDollarSign, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

const CalculatorContainer = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 3rem 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0,0,0,0.1);
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
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1.1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
`;

const Step = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.colors.secondary : '#ddd'};
  transition: all 0.3s ease;
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

const FundingCalculator = () => {
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
    let baseAmount = parseFloat(formData.monthlyRevenue) * 1.5;
    
    if (formData.timeInBusiness === '2+') baseAmount *= 1.2;
    if (formData.timeInBusiness === '5+') baseAmount *= 1.3;
    
    if (formData.creditScore === '650-700') baseAmount *= 1.1;
    if (formData.creditScore === '700+') baseAmount *= 1.2;
    
    const finalAmount = Math.min(baseAmount, 500000);
    setEstimatedAmount(finalAmount);
    nextStep();
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
                <option value="retail">Retail</option>
                <option value="restaurant">Restaurant</option>
                <option value="service">Service Business</option>
                <option value="construction">Construction</option>
                <option value="other">Other</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Monthly Revenue</Label>
              <Input
                type="number"
                name="monthlyRevenue"
                placeholder="Enter average monthly revenue"
                value={formData.monthlyRevenue}
                onChange={handleInputChange}
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
              <FaDollarSign />{estimatedAmount.toLocaleString()}
            </EstimatedAmount>
            <p>Estimated Available Funding*</p>
            <small>*Final approval and terms subject to underwriting review</small>
            
            <Form>
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
        <CalculatorContainer>
          <StepIndicator>
            {[1, 2, 3, 4].map((i) => (
              <Step key={i} active={i <= step} />
            ))}
          </StepIndicator>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </CalculatorContainer>
      </Container>
    </Section>
  );
};

export default FundingCalculator; 