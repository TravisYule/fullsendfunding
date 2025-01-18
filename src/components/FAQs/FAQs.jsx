import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.theme.colors.lightGray};
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Question = styled.div`
  width: 100%;
  text-align: left;
  padding: 1.5rem;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding-right: 2rem;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Icon = styled(motion.div)`
  color: ${props => props.theme.colors.secondary};
`;

const Answer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const faqs = [
  {
    question: "What are the requirements to get funded?",
    answer: "To qualify for funding, your business should have: 1) Been in operation for at least 6 months, 2) Monthly revenue of $10,000 or more, 3) A business bank account, and 4) No open bankruptcies."
  },
  {
    question: "How much funding can I receive?",
    answer: "Funding amounts range from $10,000 to $500,000+, depending on your business's monthly revenue and overall health. The amount you qualify for is typically between 80% to 150% of your average monthly revenue."
  },
  {
    question: "How quickly can I get funded?",
    answer: "Most businesses receive funding within 24 hours of approval. The entire process, from application to funding, typically takes 24-48 hours."
  },
  {
    question: "What documents do I need to apply?",
    answer: "We keep it simple. You'll need: 1) 3 months of business bank statements, 2) A valid form of ID, 3) A voided business check, and 4) Basic business information."
  },
  {
    question: "Do you require collateral?",
    answer: "No, we don't require any collateral. Our funding is based on your business's revenue and performance, not your assets."
  },
  {
    question: "What are the repayment terms?",
    answer: "Repayment terms typically range from 3 to 12 months. Payments are made automatically through small, daily or weekly remittances, making it easier to manage cash flow."
  },
  {
    question: "Will applying affect my credit score?",
    answer: "No, our initial application process does not affect your credit score. We perform a soft credit pull that has no impact on your credit rating."
  }
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Section>
      <Container>
        <Header>
          <Title>Frequently Asked Questions</Title>
          <Subtitle>
            Find answers to common questions about our funding process, requirements, and terms.
          </Subtitle>
        </Header>

        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <Question
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {faq.question}
              <Icon
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown />
              </Icon>
            </Question>
            <AnimatePresence>
              {activeIndex === index && (
                <Answer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </Answer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </Container>
    </Section>
  );
};

export default FAQs; 