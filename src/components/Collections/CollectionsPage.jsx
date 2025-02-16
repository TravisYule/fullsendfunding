import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaUserSecret } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.accent} 100%
  );
  padding: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  position: relative;
`;

const ThumbsUp = styled(motion.div)`
  font-size: 6rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
`;

const Title = styled(motion.h1)`
  color: ${props => props.theme.colors.primary};
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
`;

const Message = styled(motion.p)`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SubMessage = styled(motion.p)`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FinalMessage = styled(motion.p)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  font-weight: 800;
  margin-top: 1rem;
`;

const HiddenBob = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.5rem;
  opacity: 0.1;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
    
    .bob-text {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .bob-text {
    font-size: 0.8rem;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }
`;

const CollectionsPage = () => {
  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ThumbsUp
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 20, 0] }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            rotate: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }
          }}
        >
          <FaThumbsUp />
        </ThumbsUp>
        
        <Title
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Welcome to Collections!
        </Title>
        
        <Message
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          We're here to help you recover what's rightfully yours. 
          Let's make it happen! 💪
        </Message>
        <SubMessage
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Big Bobby is going to check under your bed!
        </SubMessage>
        <FinalMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Payup or Shutup
        </FinalMessage>
        
        <HiddenBob
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 2 }}
        >
          <FaUserSecret />
          <span className="bob-text">Little Bob is watching...</span>
        </HiddenBob>
      </Card>
    </Container>
  );
};

export default CollectionsPage; 