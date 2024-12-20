import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAccess();
  }, [location.pathname]);

  const checkAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      // Check access based on path and role
      if (location.pathname.includes('/partner-dashboard')) {
        setHasAccess(profile?.role === 'admin' || profile?.role === 'partner');
      } else if (location.pathname.includes('/customer-dashboard')) {
        setHasAccess(profile?.role === 'admin' || profile?.role === 'customer');
      } else {
        setHasAccess(false);
      }
    } catch (error) {
      console.error('Access check error:', error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    // Redirect to appropriate login based on attempted access
    if (location.pathname.includes('/partner-dashboard')) {
      return <Navigate to="/partner-login" />;
    } else if (location.pathname.includes('/customer-dashboard')) {
      return <Navigate to="/customer-login" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute; 