import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { motion } from 'framer-motion';

const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.variant === 'secondary' 
    ? 'white' 
    : props.theme.colors.secondary};
  color: ${props => props.variant === 'secondary' 
    ? props.theme.colors.primary 
    : 'white'};
  border: ${props => props.variant === 'secondary' 
    ? `2px solid ${props.theme.colors.primary}` 
    : 'none'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SubmitDeal = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    client_name: '',
    phone: '',
    email: '',
    business_type: '',
    monthly_revenue: '',
    years_in_business: '',
    desired_amount: '',
    use_of_funds: '',
    additional_notes: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Create the deal record
      const { data, error } = await supabase
        .from('deals')
        .insert([
          {
            partner_id: user.id,
            business_name: formData.business_name,
            client_name: formData.client_name,
            phone: formData.phone,
            email: formData.email,
            business_type: formData.business_type,
            monthly_revenue: parseFloat(formData.monthly_revenue),
            years_in_business: parseFloat(formData.years_in_business),
            desired_amount: parseFloat(formData.desired_amount),
            use_of_funds: formData.use_of_funds,
            additional_notes: formData.additional_notes,
            status: 'Intake',
            submitted_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Reset form
      setFormData({
        business_name: '',
        client_name: '',
        phone: '',
        email: '',
        business_type: '',
        monthly_revenue: '',
        years_in_business: '',
        desired_amount: '',
        use_of_funds: '',
        additional_notes: ''
      });

      // Show success message or redirect
      alert('Deal submitted successfully!');

    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Submit New Deal</Title>

        <FormSection>
          <SectionTitle>Business Information</SectionTitle>
          <InputGroup>
            <Label>Business Name</Label>
            <Input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Client Name</Label>
            <Input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Business Details</SectionTitle>
          <InputGroup>
            <Label>Business Type</Label>
            <Input
              type="text"
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Monthly Revenue</Label>
            <Input
              type="number"
              name="monthly_revenue"
              value={formData.monthly_revenue}
              onChange={handleChange}
              min="0"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Years in Business</Label>
            <Input
              type="number"
              name="years_in_business"
              value={formData.years_in_business}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Desired Amount</Label>
            <Input
              type="number"
              name="desired_amount"
              value={formData.desired_amount}
              onChange={handleChange}
              min="0"
              required
            />
          </InputGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Additional Information</SectionTitle>
          <InputGroup>
            <Label>Use of Funds</Label>
            <TextArea
              name="use_of_funds"
              value={formData.use_of_funds}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Additional Notes</Label>
            <TextArea
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
            />
          </InputGroup>
        </FormSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <Button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Deal'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default SubmitDeal; 