import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

const Section = styled.section`
  padding: 5rem 2rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.lightGray};
`;

const LoginContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 75, 75, 0.1);
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.primary};
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #ff3333;
  }
`;

const ForgotPassword = styled.a`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: block;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoImage = styled.img`
  height: 100px;
  width: auto;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check user role from Supabase user metadata
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      // Redirect based on role
      if (profile?.role === 'admin') {
        navigate('/partner-dashboard');
      } else {
        navigate('/partner-portal');
      }
      
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <LoginContainer>
        <LogoContainer>
          <LogoImage src={Logo} alt="Full Send Funding" />
        </LogoContainer>
        <Title>Partner Portal</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Icon>
              <FaUser />
            </Icon>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Icon>
              <FaLock />
            </Icon>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <LoginButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </LoginButton>
        </Form>
        
        <ForgotPassword href="#">
          Forgot Password?
        </ForgotPassword>
      </LoginContainer>
    </Section>
  );
};

export default PartnerLogin; 