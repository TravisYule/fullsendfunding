import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.8);
  }
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.colors.primary};
  border-top: 3px solid transparent;
  border-radius: 50%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }
`;

const LoadingText = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
    margin-top: 1rem;
    color: ${props => props.theme.colors.primary};
    font-size: 0.9rem;
  }
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <div>
        <Spinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <LoadingText>Loading...</LoadingText>
      </div>
    </LoadingContainer>
  );
};

export default LoadingScreen; 