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
      if (location.pathname.includes('/partner')) {
        // For partner portal paths
        if (profile?.role === 'admin' || profile?.role === 'partner') {
          setHasAccess(true);
        } else {
          // Only sign out if explicitly trying to access partner routes as non-partner
          await supabase.auth.signOut();
          setHasAccess(false);
        }
      } else if (location.pathname.includes('/customer')) {
        // For customer portal paths
        if (profile?.role === 'admin' || profile?.role === 'customer') {
          setHasAccess(true);
        } else {
          // Only sign out if explicitly trying to access customer routes as non-customer
          await supabase.auth.signOut();
          setHasAccess(false);
        }
      } else {
        // For any other protected routes, require authentication
        setHasAccess(!!session);
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
    if (location.pathname.includes('/partner')) {
      return <Navigate to="/partner-login" />;
    } else if (location.pathname.includes('/customer')) {
      return <Navigate to="/customer-login" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute; 