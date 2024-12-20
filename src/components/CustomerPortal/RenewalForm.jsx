import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { motion } from 'framer-motion';

const FormContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const FileUploadSection = styled.div`
  margin-bottom: 2rem;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: block;
  padding: 1rem;
  background: ${props => props.theme.colors.lightGray};
  border: 2px dashed ${props => props.theme.colors.primary};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary + '10'};
  }
`;

const FileList = styled.div`
  margin-top: 1rem;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const SignatureSection = styled.div`
  margin-bottom: 2rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  color: ${props => props.theme.colors.text};
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SignatureText = styled.span`
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
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
    ? `1px solid ${props.theme.colors.primary}` 
    : 'none'};
  border-radius: 4px;
  cursor: pointer;
`;

const RenewalForm = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      for (const file of files) {
        const { error } = await supabase.storage
          .from('bank-statements')
          .upload(`${user.id}/${file.name}`, file);
          
        if (error) throw error;
      }

      const { error } = await supabase
        .from('renewal_requests')
        .insert({
          user_id: user.id,
          agreed_to_terms: isAgreed,
          status: 'pending',
          submitted_at: new Date().toISOString()
        });

      if (error) throw error;

      navigate('/customer-dashboard');
    } catch (error) {
      console.error('Error submitting renewal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Submit Renewal Request</Title>
        
        <FileUploadSection>
          <h3>Upload Bank Statements</h3>
          <p>Please upload your last 4 business bank statements (PDF format)</p>
          <FileLabel>
            <FileInput 
              type="file" 
              accept=".pdf"
              multiple
              onChange={handleFileChange}
            />
            Click to upload bank statements
          </FileLabel>
          
          <FileList>
            {files.map((file, index) => (
              <FileItem key={index}>
                <span>{file.name}</span>
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={() => removeFile(index)}
                >
                  Remove
                </Button>
              </FileItem>
            ))}
          </FileList>
        </FileUploadSection>

        <SignatureSection>
          <h3>Electronic Signature</h3>
          <CheckboxContainer>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                required
              />
              <SignatureText>
                By checking this box, I hereby agree to submit these bank statements
                for renewal consideration and certify that all information provided is
                true and accurate.
              </SignatureText>
            </CheckboxLabel>
          </CheckboxContainer>
        </SignatureSection>

        <ButtonGroup>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/customer-dashboard')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || files.length < 4 || !isAgreed}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Renewal'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default RenewalForm; 