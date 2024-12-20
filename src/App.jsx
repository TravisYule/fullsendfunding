import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import IndustryCards from './components/IndustryCards/IndustryCards';
import ProcessTimeline from './components/ProcessTimeline/ProcessTimeline';

const HomePage = () => (
  <main style={{ paddingTop: '80px' }}>
    <Hero />
    <IndustryCards />
    <ProcessTimeline />
  </main>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes here later */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 