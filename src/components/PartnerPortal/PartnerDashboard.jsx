import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import DealsPipeline from './DealsPipeline';

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
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.variant === 'secondary' ? 'white' : props.theme.colors.secondary};
  color: ${props => props.variant === 'secondary' ? props.theme.colors.primary : 'white'};
  border: ${props => props.variant === 'secondary' ? `1px solid ${props.theme.colors.primary}` : 'none'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const StatTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.secondary};
`;

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0
  });

  useEffect(() => {
    getProfile();
    getStats();
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

  const getStats = async () => {
    // TODO: Implement stats fetching from your applications table
    // This is a placeholder for now
    setStats({
      totalApplications: 25,
      pendingApplications: 8,
      approvedApplications: 12
    });
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

  return (
    <DashboardContainer>
      <Header>
        <Title>Partner Dashboard</Title>
        <Controls>
          <Button variant="secondary" onClick={() => navigate('/applications')}>
            View Applications
          </Button>
          <Button onClick={handleLogout}>Log Out</Button>
        </Controls>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatTitle>Total Applications</StatTitle>
          <StatValue>{stats.totalApplications}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Pending Review</StatTitle>
          <StatValue>{stats.pendingApplications}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Approved</StatTitle>
          <StatValue>{stats.approvedApplications}</StatValue>
        </StatCard>
      </StatsGrid>

      <DealsPipeline />

      {/* Add more dashboard sections here */}
    </DashboardContainer>
  );
};

export default PartnerDashboard; 