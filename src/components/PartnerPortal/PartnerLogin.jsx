import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role === 'admin' || profile?.role === 'partner') {
        navigate('/partner-dashboard');
      } else {
        await supabase.auth.signOut();
      }
    }
  };

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
      await supabase.auth.signOut();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        throw profileError;
      }

      console.log('User role:', profile?.role);

      if (profile?.role === 'admin' || profile?.role === 'partner') {
        navigate('/partner-dashboard');
      } else {
        console.log('Invalid role for partner portal:', profile?.role);
        setError('Invalid partner credentials');
        await supabase.auth.signOut();
      }
      
    } catch (error) {
      console.error('Login error:', error);
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