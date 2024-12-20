import React, { useState, useEffect } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import Logo from '../../assets/Logo.png';
import {
  Section,
  LoginContainer,
  LogoContainer,
  LogoImage,
  Title,
  Form,
  InputGroup,
  Input,
  Icon,
  Button,
  ErrorMessage,
  ForgotPassword
} from '../Shared/PortalStyles';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add session check on mount
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

      if (profile?.role === 'admin' || profile?.role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        // Sign out if wrong role
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
      // First sign out of any existing session
      await supabase.auth.signOut();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin' || profile?.role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        setError('Invalid customer credentials');
        await supabase.auth.signOut();
      }
      
    } catch (error) {
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
        <LogoContainer>
          <LogoImage src={Logo} alt="Full Send Funding" />
        </LogoContainer>
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
        
        <ForgotPassword href="/reset-password?type=request">
          Forgot Password?
        </ForgotPassword>
      </LoginContainer>
    </Section>
  );
};

export default CustomerLogin; 