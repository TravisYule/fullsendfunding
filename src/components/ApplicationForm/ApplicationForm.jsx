import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { formatCurrency, parseCurrency } from '../../utils/formatters';

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 800px;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Form = styled.form`
  background: ${props => props.theme.colors.lightGray};
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 1rem;
  }
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
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px; // Prevents iOS zoom on focus
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;

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
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text};
`;

const Checkbox = styled.input`
  margin-top: 0.25rem;
  cursor: pointer;
`;

const initialFormState = {
  businessName: '',
  ownerName: '',
  dateOfBirth: '',
  socialSecurityNumber: '',
  email: '',
  phone: '',
  monthlyRevenue: '',
  fundingAmount: '',
  industry: '',
  timeInBusiness: '',
  ein: ''
};

const ApplicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [partnerId, setPartnerId] = useState(null);

  const [formData, setFormData] = useState(() => {
    // Try to get stored data
    const storedData = localStorage.getItem('applicationData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Clear stored data after retrieving
      localStorage.removeItem('applicationData');
      return {
        ...initialFormState,
        ...parsedData,
        monthlyRevenue: formatCurrency(parsedData.monthlyRevenue || '0')
      };
    }
    return initialFormState;
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Check for partner ID in URL params
    const params = new URLSearchParams(location.search);
    const pid = params.get('pid');
    if (pid) {
      setPartnerId(pid);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Format the data for Supabase
      const applicationData = {
        business_name: formData.businessName,
        owner_name: formData.ownerName,
        date_of_birth: formData.dateOfBirth,
        ssn: formData.socialSecurityNumber,
        email: formData.email,
        phone: formData.phone,
        monthly_revenue: parseCurrency(formData.monthlyRevenue),
        funding_amount: formData.fundingAmount,
        industry: formData.industry,
        time_in_business: formData.timeInBusiness,
        ein: formData.ein,
        partner_id: partnerId,
        source: partnerId ? 'partner' : 'direct',
        status: 'Intake'
      };

      const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();

      if (error) throw error;

      setSubmitSuccess(true);
      // Clear form data
      setFormData(initialFormState);
      // Clear localStorage
      localStorage.removeItem('applicationData');

      // Show success message and redirect after delay
      setTimeout(() => {
        navigate('/thank-you');
      }, 3000);

    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileName) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleMonthlyRevenueChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData({
      ...formData,
      monthlyRevenue: formatted
    });
  };

  return (
    <Section>
      <Container>
        <Header>
          <Title>Apply for Funding</Title>
          <Subtitle>
            Complete the form below to start your funding application. Get approved in as little as 24 hours.
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {submitSuccess && (
            <SuccessMessage>
              Application submitted successfully! You will be redirected shortly...
            </SuccessMessage>
          )}

          {submitError && (
            <ErrorMessage>{submitError}</ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="socialSecurityNumber">Social Security Number</Label>
            <Input
              type="text"
              id="socialSecurityNumber"
              name="socialSecurityNumber"
              value={formData.socialSecurityNumber}
              onChange={handleChange}
              placeholder="XXX-XX-XXXX"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
            <Input
              type="text"
              name="monthlyRevenue"
              placeholder="Monthly Revenue"
              value={formData.monthlyRevenue}
              onChange={handleMonthlyRevenueChange}
              required
            />
          </FormGroup>

          <FormGroup>
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
          </FormGroup>

          <FormGroup>
            <Label htmlFor="industry">Industry</Label>
            <Select
              id="industry"
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
          </FormGroup>

          <FormGroup>
            <Label htmlFor="timeInBusiness">Time in Business</Label>
            <Select
              id="timeInBusiness"
              name="timeInBusiness"
              value={formData.timeInBusiness}
              onChange={handleChange}
              required
            >
              <option value="">Select Time in Business</option>
              <option value="6-12">6-12 months</option>
              <option value="1-2">1-2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5+">5+ years</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="ein">EIN (Employer Identification Number)</Label>
            <Input
              type="text"
              id="ein"
              name="ein"
              value={formData.ein}
              onChange={handleChange}
              placeholder="XX-XXXXXXX"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Attach Documents</Label>
            <FileUploadSection>
              <FileLabel htmlFor="file-upload">
                <UploadIcon />
                <span>Upload your bank statements and documents here</span>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  Drag and drop files or click to browse
                </span>
              </FileLabel>
              <FileInput
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              />
              {files.length > 0 && (
                <FileList>
                  {files.map((file, index) => (
                    <FileItem key={index}>
                      <span>{file.name}</span>
                      <RemoveButton onClick={() => removeFile(file.name)}>×</RemoveButton>
                    </FileItem>
                  ))}
                </FileList>
              )}
            </FileUploadSection>
            <RequiredNote>
              *For expedited funding please attach the last 4 months of Business Bank Statements, Drivers License, and Voided Check
            </RequiredNote>
          </FormGroup>

          <CheckboxContainer>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                required
              />
              <span>
                By checking this box, I confirm that all information provided is accurate and true. 
                I authorize Full Send Funding to verify all submitted information and perform any 
                necessary credit checks. I understand this serves as my electronic signature for 
                this application.
              </span>
            </CheckboxLabel>
          </CheckboxContainer>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!isAgreed || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </SubmitButton>
        </Form>
      </Container>
    </Section>
  );
};

// Add styled components for success/error messages
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

export default ApplicationForm; 