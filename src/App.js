import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import IndustryCards from './components/IndustryCards/IndustryCards';
import ProcessTimeline from './components/ProcessTimeline/ProcessTimeline';
import AboutUs from './components/AboutUs/AboutUs';
import Industries from './components/Industries/Industries';
import Partner from './components/Partner/Partner';
import FAQs from './components/FAQs/FAQs';
import Testimonials from './components/Testimonials/Testimonials';
import ApplicationForm from './components/ApplicationForm/ApplicationForm';
import ReasonSection from './components/Home/ReasonSection';
import QualificationSection from './components/Home/QualificationSection';
import Contact from './components/Contact/Contact';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Footer from './components/Footer/Footer';
import AccoladeBanner from './components/AccoladeBanner/AccoladeBanner';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Terms from './components/Terms/Terms';
import FundingCalculator from './components/Calculator/FundingCalculator';
import ProtectedRoute from './components/ProtectedRoute';

const MainContent = styled.main`
  padding-top: 118px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-top: 115px;
    padding-bottom: 0;
  }
`;

// Lazy load the partner portal components
const PartnerLogin = lazy(() => import('./components/PartnerPortal/PartnerLogin'));
const PartnerDashboard = lazy(() => import('./components/PartnerPortal/PartnerDashboard'));
const CustomerLogin = lazy(() => import('./components/CustomerPortal/CustomerLogin'));
const CustomerDashboard = lazy(() => import('./components/CustomerPortal/CustomerDashboard'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <MainContent>
        <Routes>
          {/* Main site routes - these should work without Supabase */}
          <Route path="/" element={
            <>
              <Hero />
              <QualificationSection />
              <IndustryCards />
              <FundingCalculator />
              <ProcessTimeline />
              <ReasonSection />
            </>
          } />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/process" element={<HowItWorks />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/calculator" element={<FundingCalculator />} />

          {/* Partner Portal routes - wrapped in Suspense for lazy loading */}
          <Route path="/partner-login" element={
            <Suspense fallback={<div>Loading...</div>}>
              <PartnerLogin />
            </Suspense>
          } />
          <Route path="/partner-dashboard" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <PartnerDashboard />
              </ProtectedRoute>
            </Suspense>
          } />

          {/* Customer Portal routes */}
          <Route path="/customer-login" element={
            <Suspense fallback={<div>Loading...</div>}>
              <CustomerLogin />
            </Suspense>
          } />
          <Route path="/customer-dashboard" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            </Suspense>
          } />
        </Routes>
      </MainContent>
      <AccoladeBanner />
      <Footer />
    </>
  );
}

export default App; 