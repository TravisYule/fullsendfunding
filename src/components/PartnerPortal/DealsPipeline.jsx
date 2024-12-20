import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';

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

const Stage = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 1rem;
  border-radius: 6px;
  min-height: 200px;
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

  if (loading) {
    return <div>Loading deals...</div>;
  }

  return (
    <PipelineContainer>
      <StagesGrid>
        {stages.map(stage => (
          <Stage key={stage}>
            <StageHeader>
              <StageTitle>{stage}</StageTitle>
              <DealCount>{getDealsByStage(stage).length}</DealCount>
            </StageHeader>
            {getDealsByStage(stage).map(deal => (
              <DealCard key={deal.id}>
                <BusinessName>{deal.business_name}</BusinessName>
                <DealAmount>{formatCurrency(deal.amount)}</DealAmount>
                <DealInfo>
                  <div>Client: {deal.client_name}</div>
                  <div>Submitted: {new Date(deal.created_at).toLocaleDateString()}</div>
                </DealInfo>
              </DealCard>
            ))}
          </Stage>
        ))}
      </StagesGrid>
    </PipelineContainer>
  );
};

export default DealsPipeline; 