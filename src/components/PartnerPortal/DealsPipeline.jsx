import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const PipelineContainer = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const StagesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const StageColumn = styled(motion.div)`
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const StageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.expanded ? '1rem' : '0'};
`;

const StageTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DealCount = styled.span`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
`;

const DealCard = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 1.2rem;
  border-radius: 6px;
  margin-bottom: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const BusinessName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const DealAmount = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-weight: 600;
  margin: 0.75rem 0;
  font-size: 1.2rem;
  
  &::before {
    content: 'Requested: ';
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text};
    font-weight: normal;
  }
`;

const DealInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(0,0,0,0.1);
`;

const stages = [
  'Intake',
  'Review',
  'Underwriting',
  'Declined',
  'Resubmit',
  'Approved',
  'Docs Out'
];

const DealModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: 0.95rem;
`;

const DetailValue = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  text-align: right;
`;

const DealsPipeline = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('partner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.status === stage);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleDealClick = (e, deal) => {
    e.stopPropagation();
    setSelectedDeal(deal);
  };

  if (loading) {
    return <div>Loading deals...</div>;
  }

  return (
    <PipelineContainer>
      <StagesGrid>
        {stages.map(stage => {
          const stageDeals = getDealsByStage(stage);
          const isExpanded = selectedStage === stage;
          
          return (
            <StageColumn 
              key={stage}
              onClick={() => setSelectedStage(isExpanded ? null : stage)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <StageHeader expanded={isExpanded}>
                <StageTitle>
                  {stage}
                  <DealCount>{stageDeals.length}</DealCount>
                </StageTitle>
              </StageHeader>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stageDeals.map(deal => (
                      <DealCard 
                        key={deal.id}
                        onClick={(e) => handleDealClick(e, deal)}
                      >
                        <BusinessName>{deal.business_name}</BusinessName>
                        <DealAmount>
                          <span>Requested: </span>
                          {formatCurrency(deal.amount)}
                        </DealAmount>
                        <DealInfo>
                          <div>Client: {deal.first_name} {deal.last_name}</div>
                          <div>Submitted: {new Date(deal.created_at).toLocaleDateString()}</div>
                        </DealInfo>
                      </DealCard>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </StageColumn>
          );
        })}
      </StagesGrid>

      <AnimatePresence>
        {selectedDeal && (
          <>
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDeal(null)}
            />
            <DealModal
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <CloseButton onClick={() => setSelectedDeal(null)}>&times;</CloseButton>
              <h2>{selectedDeal.business_name}</h2>
              <DetailRow>
                <DetailLabel>Client Name</DetailLabel>
                <DetailValue>{selectedDeal.first_name} {selectedDeal.last_name}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Requested Amount</DetailLabel>
                <DetailValue>{formatCurrency(selectedDeal.amount)}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{selectedDeal.email}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>{selectedDeal.phone}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Industry</DetailLabel>
                <DetailValue>{selectedDeal.industry}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Time in Business</DetailLabel>
                <DetailValue>{selectedDeal.time_in_business}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Monthly Revenue</DetailLabel>
                <DetailValue>{formatCurrency(selectedDeal.monthly_revenue)}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>{selectedDeal.status}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Submitted</DetailLabel>
                <DetailValue>{new Date(selectedDeal.created_at).toLocaleDateString()}</DetailValue>
              </DetailRow>
            </DealModal>
          </>
        )}
      </AnimatePresence>
    </PipelineContainer>
  );
};

export default DealsPipeline; 