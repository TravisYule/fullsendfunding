import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, parseCurrency } from '../../utils/formatters';
import { FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';
import LoadingOverlay from '../shared/LoadingOverlay';
import { useNavigate } from 'react-router-dom';

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

const SubmitSuccessMessage = styled.div`
  color: green;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const FileUploadSection = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border: 2px dashed ${props => props.theme.colors.secondary};
  border-radius: 8px;
  text-align: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const UploadIcon = styled(FaCloudUploadAlt)`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  
  &:hover {
    color: red;
  }
`;

const RequiredNote = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-style: italic;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 2rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const SuccessOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SuccessCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const SuccessIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1.5rem;
`;

const SuccessTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const initialFormState = {
  businessName: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  socialSecurityNumber: '',
  email: '',
  phone: '',
  monthlyRevenue: '',
  fundingAmount: '',
  industry: '',
  timeInBusiness: '',
  ein: '',
  useOfFunds: '',
  additionalNotes: ''
};

const SubmitDeal = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMonthlyRevenueChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData(prev => ({
      ...prev,
      monthlyRevenue: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const amountValue = formData.fundingAmount.split('-')[0];
      
      const applicationData = {
        business_name: formData.businessName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        ssn: formData.socialSecurityNumber,
        email: formData.email,
        phone: formData.phone,
        monthly_revenue: parseCurrency(formData.monthlyRevenue),
        amount: parseInt(amountValue),
        funding_amount: formData.fundingAmount,
        industry: formData.industry,
        time_in_business: formData.timeInBusiness,
        ein: formData.ein,
        notes: formData.additionalNotes,
        partner_id: user.id,
        source: 'partner',
        status: 'Intake'
      };

      const { error: submitError } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (submitError) throw submitError;

      setShowSuccess(true);
      
      setFormData(initialFormState);
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/partner-dashboard');
      }, 3000);

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to submit deal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      {isSubmitting && <LoadingOverlay />}
      
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SuccessCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <SuccessIcon />
              <SuccessTitle>Deal Submitted Successfully!</SuccessTitle>
              <SuccessMessage>
                Your deal has been submitted and will be reviewed by our team. 
                You will be redirected to your dashboard shortly.
              </SuccessMessage>
            </SuccessCard>
          </SuccessOverlay>
        )}
      </AnimatePresence>

      <Form onSubmit={handleSubmit}>
        <Title>Submit New Deal</Title>

        {success && (
          <SubmitSuccessMessage>
            Deal submitted successfully!
          </SubmitSuccessMessage>
        )}

        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}

        <FormSection>
          <SectionTitle>Business Information</SectionTitle>
          
          <InputGroup>
            <Label>Business Name</Label>
            <Input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Client First Name</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Client Last Name</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Social Security Number</Label>
            <Input
              name="socialSecurityNumber"
              value={formData.socialSecurityNumber}
              onChange={handleChange}
              placeholder="XXX-XX-XXXX"
              required
            />
          </InputGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Contact Information</SectionTitle>
          
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

          <InputGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Business Details</SectionTitle>
          
          <InputGroup>
            <Label>Monthly Revenue</Label>
            <Input
              name="monthlyRevenue"
              value={formData.monthlyRevenue}
              onChange={handleMonthlyRevenueChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Desired Funding Amount</Label>
            <Select
              name="fundingAmount"
              value={formData.fundingAmount}
              onChange={handleChange}
              required
            >
              <option value="">Select Amount</option>
              <option value="10000-50000">$10,000 - $50,000</option>
              <option value="50000-100000">$50,000 - $100,000</option>
              <option value="100000-250000">$100,000 - $250,000</option>
              <option value="250000-500000">$250,000 - $500,000</option>
              <option value="500000+">$500,000+</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Industry</Label>
            <Select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">Select Industry</option>
              <option value="retail">Retail</option>
              <option value="restaurant">Restaurant</option>
              <option value="construction">Construction</option>
              <option value="transportation">Transportation</option>
              <option value="healthcare">Healthcare</option>
              <option value="hospitality">Hospitality</option>
              <option value="other">Other</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>Time in Business</Label>
            <Select
              name="timeInBusiness"
              value={formData.timeInBusiness}
              onChange={handleChange}
              required
            >
              <option value="">Select Time</option>
              <option value="6-12">6-12 months</option>
              <option value="1-2">1-2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5+">5+ years</option>
            </Select>
          </InputGroup>

          <InputGroup>
            <Label>EIN</Label>
            <Input
              name="ein"
              value={formData.ein}
              onChange={handleChange}
              placeholder="XX-XXXXXXX"
              required
            />
          </InputGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Required Documents</SectionTitle>
          <FileUploadSection>
            <FileLabel htmlFor="file-upload">
              <UploadIcon />
              <span>Upload Required Documents</span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                Last 4 months bank statements, Driver's License, Voided Check
              </span>
            </FileLabel>
            <FileInput
              id="file-upload"
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            />
            {files.length > 0 && (
              <FileList>
                {files.map((file, index) => (
                  <FileItem key={index}>
                    <span>{file.name}</span>
                    <RemoveButton onClick={() => {
                      setFiles(files.filter((_, i) => i !== index));
                    }}>×</RemoveButton>
                  </FileItem>
                ))}
              </FileList>
            )}
          </FileUploadSection>
          <RequiredNote>
            *For expedited funding please attach the last 4 months of Business Bank Statements, Driver's License, and Voided Check
          </RequiredNote>
        </FormSection>

        <CheckboxContainer>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              required
            />
            <span>
              I confirm all information is accurate and authorize Full Send Funding 
              to verify the information provided.
            </span>
          </CheckboxLabel>
        </CheckboxContainer>

        <Button
          type="submit"
          disabled={isSubmitting || !isAgreed}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Deal'}
        </Button>
      </Form>
    </Container>
  );
};

export default SubmitDeal; 