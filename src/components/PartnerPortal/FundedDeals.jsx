import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../utils/supabaseClient';
import { formatCurrency } from '../../utils/formatters';

const Container = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const DealsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DealCard = styled(motion.div)`
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const BusinessName = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const DealAmount = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-weight: 600;
  margin: 0.75rem 0;
  font-size: 1.2rem;
  
  &::before {
    content: 'Funded: ';
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text};
    font-weight: normal;
  }
`;

const DealInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

// Reuse the modal components from DealsPipeline
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const DealModal = styled(motion.div)`
  position: relative;
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  margin: auto;

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }
`;

// ... other styled components from DealsPipeline ...

// Add safe formatting function
const safeFormatCurrency = (value) => {
  try {
    if (!value && value !== 0) return '$0';
    // Convert to number if it's a string
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  } catch (error) {
    console.error('Format error:', error, 'Value:', value);
    return '$0';
  }
};

const FundedDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    fetchFundedDeals();
  }, []);

  const fetchFundedDeals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('partner_id', user.id)
        .eq('status', 'Funded')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Log the data to see what we're getting
      console.log('Funded deals:', data);
      
      setDeals(data || []);
    } catch (error) {
      console.error('Error fetching funded deals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add error boundary
  if (!deals) return <div>No deals found</div>;

  return (
    <Container>
      <DealsGrid>
        {deals.map(deal => {
          // Log each deal to see what we're trying to format
          console.log('Processing deal:', deal);
          
          return (
            <DealCard
              key={deal.id}
              onClick={() => setSelectedDeal(deal)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BusinessName>{deal.business_name || 'Unnamed Business'}</BusinessName>
              <DealAmount>{safeFormatCurrency(deal.amount)}</DealAmount>
              <DealInfo>
                <div>Client: {deal.first_name} {deal.last_name}</div>
                <div>Funded: {new Date(deal.created_at).toLocaleDateString()}</div>
              </DealInfo>
            </DealCard>
          );
        })}
      </DealsGrid>

      <AnimatePresence>
        {selectedDeal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDeal(null)}
          >
            <DealModal
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedDeal(null)}>&times;</CloseButton>
              <h2>{selectedDeal.business_name}</h2>
              {/* Same detail rows as DealsPipeline */}
              <DetailRow>
                <DetailLabel>Client Name</DetailLabel>
                <DetailValue>{selectedDeal.first_name} {selectedDeal.last_name}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Funded Amount</DetailLabel>
                <DetailValue>{safeFormatCurrency(selectedDeal.amount)}</DetailValue>
              </DetailRow>
              {/* Add more details as needed */}
            </DealModal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default FundedDeals; 