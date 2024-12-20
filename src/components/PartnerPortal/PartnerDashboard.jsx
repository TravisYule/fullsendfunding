import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import DealsPipeline from './DealsPipeline';
import FundedDeals from './FundedDeals';
import SubmitDeal from './SubmitDeal';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.lightGray};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const LogoutButton = styled.button`
  padding: 0.75rem 1.5rem;
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

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pipeline');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/partner-login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'pipeline':
        return <DealsPipeline />;
      case 'funded':
        return <FundedDeals />;
      case 'submit':
        return <SubmitDeal />;
      default:
        return <DealsPipeline />;
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Partner Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === 'pipeline'} 
          onClick={() => setActiveTab('pipeline')}
        >
          Deal Pipeline
        </Tab>
        <Tab 
          active={activeTab === 'funded'} 
          onClick={() => setActiveTab('funded')}
        >
          Funded Deals
        </Tab>
        <Tab 
          active={activeTab === 'submit'} 
          onClick={() => setActiveTab('submit')}
        >
          Submit Deal
        </Tab>
      </TabsContainer>

      {renderContent()}
    </DashboardContainer>
  );
};

export default PartnerDashboard; 