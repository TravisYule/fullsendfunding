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

const MainContent = styled.main`
  padding-top: 118px; // TopBar height (28px) + HeaderContainer height (90px)
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-top: 90px; // Adjusted for mobile header height
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
        </Routes>
      </MainContent>
      <AccoladeBanner />
      <Footer />
    </>
  );
}

export default App; 