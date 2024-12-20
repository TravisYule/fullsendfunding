import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import LoadingScreen from './shared/LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    checkAccess();
  }, [location.pathname]);

  const checkAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setHasAccess(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      // Check access based on path and role
      if (location.pathname.includes('/partner')) {
        if (profile?.role === 'admin' || profile?.role === 'partner') {
          setHasAccess(true);
        } else {
          await supabase.auth.signOut();
          setHasAccess(false);
        }
      } else if (location.pathname.includes('/customer')) {
        if (profile?.role === 'admin' || profile?.role === 'customer') {
          setHasAccess(true);
        } else {
          await supabase.auth.signOut();
          setHasAccess(false);
        }
      } else {
        setHasAccess(!!session);
      }
    } catch (error) {
      console.error('Access check error:', error);
      setHasAccess(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  if (loading) {
    return <LoadingScreen />;
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