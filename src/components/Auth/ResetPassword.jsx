import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import Logo from '../../assets/Logo.png';

const Section = styled.section`
  padding: 5rem 2rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.lightGray};
`;

const Container = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const LogoImage = styled.img`
  height: 80px;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const Button = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin: 1rem 0;
  padding: 0.75rem;
  border-radius: 4px;
  color: ${props => props.error ? 'red' : 'green'};
  background: ${props => props.error ? '#ffe6e6' : '#e6ffe6'};
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'request'; // 'request' or 'reset'

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password?type=reset`,
      });

      if (error) throw error;
      setMessage('Password reset instructions have been sent to your email.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      setMessage('Password has been successfully reset. Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoImage src={Logo} alt="Full Send Funding" />
        <Title>
          {type === 'request' ? 'Reset Password' : 'Set New Password'}
        </Title>

        {message && <Message>{message}</Message>}
        {error && <Message error>{error}</Message>}

        <Form onSubmit={type === 'request' ? handleRequestReset : handleResetPassword}>
          {type === 'request' ? (
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : type === 'request' ? 'Send Reset Link' : 'Update Password'}
          </Button>
        </Form>

        <BackLink onClick={() => navigate(-1)}>
          Back to Login
        </BackLink>
      </Container>
    </Section>
  );
};

export default ResetPassword; 