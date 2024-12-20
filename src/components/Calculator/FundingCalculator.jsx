import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalculator, FaDollarSign } from 'react-icons/fa';

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

const FundingCalculator = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [timeInBusiness, setTimeInBusiness] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [estimatedAmount, setEstimatedAmount] = useState(null);

  const calculateFunding = (e) => {
    e.preventDefault();
    
    // Basic calculation logic (you can adjust this based on your criteria)
    let baseAmount = parseFloat(monthlyRevenue) * 1.5;
    
    // Adjust based on time in business
    if (timeInBusiness === '2+') baseAmount *= 1.2;
    if (timeInBusiness === '5+') baseAmount *= 1.3;
    
    // Adjust based on credit score
    if (creditScore === '650-700') baseAmount *= 1.1;
    if (creditScore === '700+') baseAmount *= 1.2;
    
    // Cap at 500k
    const finalAmount = Math.min(baseAmount, 500000);
    
    setEstimatedAmount(finalAmount);
  };

  return (
    <Section>
      <Container>
        <SectionTitle>Calculate Your Funding</SectionTitle>
        <SectionSubtitle>
          See how much funding you may qualify for in just a few simple steps
        </SectionSubtitle>
        <CalculatorContainer>
          <Form onSubmit={calculateFunding}>
            <InputGroup>
              <Label>Monthly Revenue</Label>
              <Input
                type="number"
                placeholder="Enter monthly revenue"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Time in Business</Label>
              <Select
                value={timeInBusiness}
                onChange={(e) => setTimeInBusiness(e.target.value)}
                required
              >
                <option value="">Select time in business</option>
                <option value="0-2">0-2 years</option>
                <option value="2+">2+ years</option>
                <option value="5+">5+ years</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Credit Score Range</Label>
              <Select
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                required
              >
                <option value="">Select credit score range</option>
                <option value="below-600">Below 600</option>
                <option value="600-650">600-650</option>
                <option value="650-700">650-700</option>
                <option value="700+">700+</option>
              </Select>
            </InputGroup>

            <CalculateButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Calculate Funding
            </CalculateButton>
          </Form>

          {estimatedAmount && (
            <ResultContainer>
              <EstimatedAmount>
                <FaDollarSign />{estimatedAmount.toLocaleString()}
              </EstimatedAmount>
              <p>Estimated Available Funding*</p>
              <small>*Final approval and terms subject to underwriting review</small>
            </ResultContainer>
          )}
        </CalculatorContainer>
      </Container>
    </Section>
  );
};

export default FundingCalculator; 