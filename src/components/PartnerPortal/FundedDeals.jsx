import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';

const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const DealCard = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const BusinessName = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  .label {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-weight: bold;
    color: ${props => props.theme.colors.secondary};
  }
`;

const RenewalStatus = styled.div`
  padding: 0.5rem;
  background: ${props => 
    props.status === 'eligible' 
      ? '#e6ffe6' 
      : props.status === 'soon'
      ? '#fff3e6'
      : '#ffe6e6'};
  color: ${props => 
    props.status === 'eligible'
      ? '#006600'
      : props.status === 'soon'
      ? '#cc7700'
      : '#cc0000'};
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
`;

const FundedDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFundedDeals();
  }, []);

  const fetchFundedDeals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          payments:deal_payments(
            amount,
            due_date,
            status
          )
        `)
        .eq('partner_id', user.id)
        .eq('status', 'Funded')
        .order('funded_date', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error('Error fetching funded deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateRemainingBalance = (deal) => {
    const paidPayments = deal.payments?.filter(p => p.status === 'paid') || [];
    const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
    return deal.funded_amount - totalPaid;
  };

  const getRenewalStatus = (deal) => {
    const remainingBalance = calculateRemainingBalance(deal);
    const percentPaid = 1 - (remainingBalance / deal.funded_amount);
    
    if (percentPaid >= 0.5) return 'eligible';
    if (percentPaid >= 0.4) return 'soon';
    return 'not-eligible';
  };

  const getRenewalText = (status) => {
    switch (status) {
      case 'eligible':
        return 'Eligible for Renewal';
      case 'soon':
        return 'Soon Eligible';
      default:
        return 'Not Yet Eligible';
    }
  };

  if (loading) {
    return <div>Loading funded deals...</div>;
  }

  return (
    <Container>
      <DealsGrid>
        {deals.map(deal => {
          const renewalStatus = getRenewalStatus(deal);
          const remainingBalance = calculateRemainingBalance(deal);
          
          return (
            <DealCard key={deal.id}>
              <BusinessName>{deal.business_name}</BusinessName>
              <InfoGrid>
                <InfoItem>
                  <div className="label">Funded Amount</div>
                  <div className="value">{formatCurrency(deal.funded_amount)}</div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Remaining Balance</div>
                  <div className="value">{formatCurrency(remainingBalance)}</div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Funded Date</div>
                  <div className="value">
                    {new Date(deal.funded_date).toLocaleDateString()}
                  </div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Next Payment</div>
                  <div className="value">
                    {deal.payments?.find(p => p.status === 'pending')?.due_date
                      ? new Date(deal.payments.find(p => p.status === 'pending').due_date).toLocaleDateString()
                      : 'N/A'}
                  </div>
                </InfoItem>
              </InfoGrid>
              <RenewalStatus status={renewalStatus}>
                {getRenewalText(renewalStatus)}
              </RenewalStatus>
            </DealCard>
          );
        })}
      </DealsGrid>
    </Container>
  );
};

export default FundedDeals; 