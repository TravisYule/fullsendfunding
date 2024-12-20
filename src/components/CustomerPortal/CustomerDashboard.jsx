import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

// Similar styling as PartnerDashboard
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getProfile();
    getApplications();
  }, []);

  // ... (similar profile fetching as PartnerDashboard)

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

      {/* Add customer-specific content here */}
    </DashboardContainer>
  );
};

export default CustomerDashboard; 