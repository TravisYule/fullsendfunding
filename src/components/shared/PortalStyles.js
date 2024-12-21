import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Section = styled.section`
  padding: 5rem 2rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.lightGray};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: calc(${props => props.theme.ios.topInset} + 1rem) 1rem;
    padding-bottom: ${props => props.theme.ios.bottomInset};
    min-height: -webkit-fill-available;
  }
`;

export const LoginContainer = styled(motion.div)`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  margin: 0 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0 1rem;
    padding: 1.5rem;
    border-radius: ${props => props.theme.ios.borderRadius};
    box-shadow: 0 2px 10px rgba(0,0,0,0.05),
                0 0 1px rgba(0,0,0,0.1);
  }
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const LogoImage = styled.img`
  height: 80px;
  width: auto;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 1.75rem;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: ${props => props.theme.colors.lightGray};
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: ${props => props.theme.ios.inputHeight};
    font-size: ${props => props.theme.ios.fontSize};
    border-radius: ${props => props.theme.ios.borderRadius};
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    padding: 0 1rem 0 2.5rem;
    
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.primary};
`;

export const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: ${props => props.theme.ios.inputHeight};
    border-radius: ${props => props.theme.ios.borderRadius};
    font-weight: 600;
    -webkit-tap-highlight-color: transparent;
    
    &:active {
      opacity: ${props => props.theme.ios.tapState.opacity};
      transition: opacity ${props => props.theme.ios.tapState.duration};
    }
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export const ForgotPassword = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 1rem;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;
