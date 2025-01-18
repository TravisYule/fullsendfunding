import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: 16px;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 14px;
    }
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: ${props => props.theme.colors.text.primary};
    background: ${props => props.theme.colors.background.light};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.primary};
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: ${props => props.theme.spacing.base};
    color: ${props => props.theme.colors.primary};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.fontSizes['2xl']};
    }
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.fontSizes.xl};
    }
  }

  h4 {
    font-size: ${props => props.theme.fontSizes.xl};
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }

  p {
    margin-bottom: ${props => props.theme.spacing.base};
    color: ${props => props.theme.colors.text.primary};
    font-size: ${props => props.theme.fontSizes.base};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.secondary};
    transition: ${props => props.theme.transitions.base};

    &:hover {
      color: ${props => props.theme.colors.secondaryDark};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.fonts.primary};
    transition: ${props => props.theme.transitions.base};
  }

  input, textarea, select {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.text.primary};
    
    &::placeholder {
      color: ${props => props.theme.colors.text.light};
    }
    
    &:focus {
      outline: none;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.gray[400]};
    border-radius: ${props => props.theme.borderRadius.full};
    
    &:hover {
      background: ${props => props.theme.colors.gray[500]};
    }
  }

  /* Selection styles */
  ::selection {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
`;

export const Section = styled.section`
  padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.base};
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.base};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.base};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap || props.theme.spacing.base};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(${props => props.tabletColumns || 6}, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(${props => props.mobileColumns || 4}, 1fr);
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: ${props => props.gap || props.theme.spacing.base};
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
  }
`;

export default GlobalStyles; 