import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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

const LoginContainer = styled(motion.div)`
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

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.primary};
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

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ForgotPassword = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: block;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const CustomerLogin = () => {
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
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        console.log('Auth Error:', authError);
        throw authError;
      }

      console.log('Auth successful, user ID:', authData.user.id);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.log('Profile Error:', profileError);
        throw profileError;
      }

      console.log('Full profile data:', profile);

      if (!profile) {
        console.log('No profile found, creating one...');
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: authData.user.id, role: 'customer' }]);

        if (insertError) throw insertError;
        
        navigate('/customer-dashboard');
      } else if (profile.role === 'customer' || profile.role === 'admin') {
        navigate('/customer-dashboard');
      } else {
        console.log('Invalid role:', profile.role);
        setError('Invalid customer credentials');
      }
    } catch (error) {
      console.error('Full error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <LoginContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoImage src={Logo} alt="Full Send Funding" />
        <Title>Customer Portal</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Icon><FaUser /></Icon>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </InputGroup>
          <InputGroup>
            <Icon><FaLock /></Icon>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </InputGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </Form>
        
        <ForgotPassword href="#">
          Forgot Password?
        </ForgotPassword>
      </LoginContainer>
    </Section>
  );
};

export default CustomerLogin; 