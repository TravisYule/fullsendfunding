import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

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

const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.variant === 'secondary' 
    ? 'white' 
    : props.theme.colors.secondary};
  color: ${props => props.variant === 'secondary' 
    ? props.theme.colors.primary 
    : 'white'};
  border: ${props => props.variant === 'secondary' 
    ? `1px solid ${props.theme.colors.primary}` 
    : 'none'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const ContentSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const CustomerDashboard = () => {
  const navigate = useNavigate();
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
      navigate('/customer-login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Customer Dashboard</Title>
        <Controls>
          <Button variant="secondary" onClick={() => navigate('/apply')}>
            New Application
          </Button>
          <Button onClick={handleLogout}>Log Out</Button>
        </Controls>
      </Header>

      <ContentSection>
        <h2>Welcome{userProfile ? `, ${userProfile.email}` : ''}!</h2>
        <p>View and manage your funding applications here.</p>
      </ContentSection>

      {/* Add more dashboard content here */}
    </DashboardContainer>
  );
};

export default CustomerDashboard; 