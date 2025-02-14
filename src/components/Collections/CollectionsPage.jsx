import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaThumbsUp } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgb(74, 27, 157) 0%,
    rgb(124, 58, 237) 100%
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
  margin-bottom: 2rem;
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
      </Card>
    </Container>
  );
};

export default CollectionsPage; 