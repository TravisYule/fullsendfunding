import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const PipelineContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const StagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0;
`;

const StageColumn = styled(motion.div)`
  background: ${props => props.theme.colors.lightGray};
  padding: 1rem;
  border-radius: 6px;
  min-height: 200px;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &:hover {
    ${props => props.clickable && `
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `}
  }
`;

const FullViewOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const FullViewContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const FullViewDeals = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const StageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
`;

const StageTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const DealCount = styled.span`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const DealCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const BusinessName = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const DealAmount = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-weight: bold;
  margin: 0.5rem 0;
`;

const DealInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const stages = [
  'Intake',
  'Underwriting',
  'Declined',
  'Resubmit',
  'Approved',
  'Contracts Out',
  'Funded'
];

const DealsPipeline = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('deals')
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

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
  };

  const handleClose = () => {
    setSelectedStage(null);
  };

  if (loading) {
    return <div>Loading deals...</div>;
  }

  return (
    <PipelineContainer>
      <StagesGrid>
        {stages.map(stage => (
          <StageColumn 
            key={stage}
            clickable={true}
            onClick={() => handleStageClick(stage)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <StageHeader>
              <StageTitle>{stage}</StageTitle>
              <DealCount>{getDealsByStage(stage).length}</DealCount>
            </StageHeader>
            {getDealsByStage(stage).slice(0, 3).map(deal => (
              <DealCard key={deal.id}>
                <BusinessName>{deal.business_name}</BusinessName>
                <DealAmount>{formatCurrency(deal.amount)}</DealAmount>
                <DealInfo>
                  <div>Client: {deal.client_name}</div>
                  <div>Submitted: {new Date(deal.created_at).toLocaleDateString()}</div>
                </DealInfo>
              </DealCard>
            ))}
            {getDealsByStage(stage).length > 3 && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                +{getDealsByStage(stage).length - 3} more
              </div>
            )}
          </StageColumn>
        ))}
      </StagesGrid>

      <AnimatePresence>
        {selectedStage && (
          <FullViewOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <FullViewContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <BackButton onClick={handleClose}>Close</BackButton>
              <h2>{selectedStage}</h2>
              <FullViewDeals>
                {getDealsByStage(selectedStage).map(deal => (
                  <DealCard key={deal.id}>
                    <BusinessName>{deal.business_name}</BusinessName>
                    <DealAmount>{formatCurrency(deal.amount)}</DealAmount>
                    <DealInfo>
                      <div>Client: {deal.client_name}</div>
                      <div>Submitted: {new Date(deal.created_at).toLocaleDateString()}</div>
                    </DealInfo>
                  </DealCard>
                ))}
              </FullViewDeals>
            </FullViewContent>
          </FullViewOverlay>
        )}
      </AnimatePresence>
    </PipelineContainer>
  );
};

export default DealsPipeline; 