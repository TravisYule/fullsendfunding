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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  margin-bottom: 2rem;
  padding: 1rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : 'white'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;

  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  }

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
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
    console.log('Active Tab:', activeTab);
    switch (activeTab) {
      case 'pipeline':
        console.log('Rendering Pipeline');
        return <DealsPipeline />;
      case 'funded':
        console.log('Rendering Funded Deals');
        return <FundedDeals />;
      case 'submit':
        console.log('Rendering Submit Deal');
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

      <TabsContainer style={{ border: '1px solid red' }}>
        <Tab 
          active={activeTab === 'pipeline'} 
          onClick={() => {
            console.log('Clicking Pipeline Tab');
            setActiveTab('pipeline');
          }}
        >
          Deal Pipeline
        </Tab>
        <Tab 
          active={activeTab === 'funded'} 
          onClick={() => {
            console.log('Clicking Funded Tab');
            setActiveTab('funded');
          }}
        >
          Funded Deals
        </Tab>
        <Tab 
          active={activeTab === 'submit'} 
          onClick={() => {
            console.log('Clicking Submit Tab');
            setActiveTab('submit');
          }}
        >
          Submit Deal
        </Tab>
      </TabsContainer>

      {renderContent()}
    </DashboardContainer>
  );
};

export default PartnerDashboard; 