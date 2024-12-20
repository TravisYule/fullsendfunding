import React from 'react';
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
import PartnerLogin from './components/PartnerPortal/PartnerLogin';

const MainContent = styled.main`
  padding-top: 118px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-top: 115px;
    padding-bottom: 0;
  }
`;

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <MainContent>
        <Routes>
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
          <Route path="/partner-login" element={<PartnerLogin />} />
        </Routes>
      </MainContent>
      <AccoladeBanner />
      <Footer />
    </>
  );
}

export default App; 