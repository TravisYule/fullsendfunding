import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';

const PipelineContainer = styled.div`
  margin-top: 2rem;
`;

const PipelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PipelineTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
`;

const PipelineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
`;

const StageColumn = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  min-width: 250px;
`;

const StageHeader = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border-radius: 6px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const BusinessName = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const Amount = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-weight: bold;
`;

const ClientName = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const DateInfo = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.5rem;
`;

const DealsPipeline = () => {
  const [deals, setDeals] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const stages = [
    'Intake',
    'Underwriting',
    'Declined',
    'Resubmit',
    'Approved',
    'Contracts Out',
    'Funded'
  ];

  useEffect(() => {
    checkRole();
    fetchDeals();
  }, []);

  const checkRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      setIsAdmin(profile?.role === 'admin');
    }
  };

  const fetchDeals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching deals:', error);
      return;
    }

    setDeals(data || []);
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <PipelineContainer>
      <PipelineHeader>
        <PipelineTitle>Deals Pipeline</PipelineTitle>
      </PipelineHeader>
      
      <PipelineGrid>
        {stages.map(stage => (
          <StageColumn key={stage}>
            <StageHeader>
              {stage}
              <DealCount>{getDealsByStage(stage).length}</DealCount>
            </StageHeader>
            {getDealsByStage(stage).map(deal => (
              <DealCard key={deal.id}>
                <BusinessName>{deal.business_name}</BusinessName>
                <Amount>{formatCurrency(deal.amount)}</Amount>
                <ClientName>{deal.client_name}</ClientName>
                <DateInfo>Submitted: {formatDate(deal.submitted_at)}</DateInfo>
              </DealCard>
            ))}
          </StageColumn>
        ))}
      </PipelineGrid>
    </PipelineContainer>
  );
};

export default DealsPipeline; 