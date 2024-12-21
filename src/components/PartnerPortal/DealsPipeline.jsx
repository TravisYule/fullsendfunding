import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const PipelineContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`;

const StagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  background: ${props => props.theme.colors.primary};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const StageColumn = styled(motion.div)`
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  min-height: 200px;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &:hover {
    ${props => props.clickable && `
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `}
  }
`;

const StageView = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const StageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${props => props.theme.colors.lightGray};
`;

const StageTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const DealCount = styled.span`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(255,75,75,0.2);
`;

const DealCard = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.8rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(3px);
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
`;

const DealInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(0,0,0,0.1);
`;

const MoreDealsIndicator = styled.div`
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 6px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const stages = [
  'Intake',
  'Review',
  'Underwriting',
  'Declined',
  'Resubmit',
  'Approved',
  'Docs Out',
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
      <AnimatePresence mode="wait">
        {!selectedStage ? (
          <StagesGrid
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
                  <MoreDealsIndicator>
                    +{getDealsByStage(stage).length - 3} more deals
                  </MoreDealsIndicator>
                )}
              </StageColumn>
            ))}
          </StagesGrid>
        ) : (
          <StageView
            key="stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BackButton onClick={handleClose}>
              ← Back to Pipeline
            </BackButton>
            <h2>{selectedStage}</h2>
            <DealsGrid>
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
            </DealsGrid>
          </StageView>
        )}
      </AnimatePresence>
    </PipelineContainer>
  );
};

export default DealsPipeline; 