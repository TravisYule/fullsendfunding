import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const PortalButton = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  padding: 0.25rem 0.5rem;
  display: inline-block;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const PortalLink = styled(PortalButton)`
  // Inherits all styles from PortalButton
`;

const TopBar = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 1.5rem;
  }
`;

const TopBarLeft = styled.div`
  display: flex;
  gap: 3rem;
`;

const TopBarItem = styled.a`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  z-index: 1000;
  height: 90px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  top: 28px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 70px;
    top: 45px;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 50px;
  }
`;

const CompanyName = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    a {
      padding: 0.5rem 0;
      text-align: center;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const ApplyButton = styled(Link)`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
    margin: 0.5rem 0;
  }
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 0;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: -0.5rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0.5rem 0;
  min-width: 200px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.3s ease;
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.secondary};
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 85%;
    max-width: 300px;
    height: 100vh;
    background: white;
    padding: 4rem 1.5rem 2rem;
    box-shadow: -2px 0 8px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    z-index: 1000;
    overflow-y: auto;

    // Add better spacing for touch targets
    a {
      padding: 1rem;
      margin: 0.5rem 0;
      border-radius: 8px;
      background: ${props => props.theme.colors.lightGray};
      
      &:active {
        background: ${props => props.theme.colors.primary};
        color: white;
      }
    }
  }
`;

const MobileOverlay = styled(motion.div)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 100;
    background: none;
    border: none;
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const MobileApplyButton = styled(Link)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.secondary};
    color: white;
    text-align: center;
    padding: 1rem;
    font-weight: 600;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  }
`;

const PortalButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MobilePortalButtons = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const Header = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDropdownItemClick = () => {
    setIsAboutOpen(false);
    handleScrollToTop();
  };

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Industries', path: '/#industries' },
    { title: 'FAQs', path: '/#faqs' },
    { title: 'Partner', path: '/partner' },
    { title: 'Apply Now', path: '/apply' }
  ];

  return (
    <>
      <TopBar>
        <TopBarContent>
          <TopBarLeft>
            <TopBarItem href="tel:518-312-0382">
              <FaPhone /> Call Us Today at 518-312-0382
            </TopBarItem>
            <TopBarItem href="mailto:travis@fullsendfunding.com">
              <FaEnvelope /> travis@fullsendfunding.com
            </TopBarItem>
          </TopBarLeft>
          <PortalButtons>
            <PortalButton to="/customer-login">Customer Portal</PortalButton>
            <PortalLink to="/partner-dashboard">Partner Portal</PortalLink>
          </PortalButtons>
        </TopBarContent>
      </TopBar>
      <HeaderContainer>
        <Nav>
          <LogoLink to="/" onClick={handleScrollToTop}>
            <LogoImage src={Logo} alt="Full Send Funding" />
            <CompanyName>Full Send Funding</CompanyName>
          </LogoLink>
          <NavLinks isOpen={isAboutOpen}>
            <NavItem 
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              About Us
              <Dropdown isOpen={isAboutOpen}>
                <DropdownItem to="/about" onClick={handleDropdownItemClick}>Why Us</DropdownItem>
                <DropdownItem to="/industries" onClick={handleDropdownItemClick}>Industries</DropdownItem>
                <DropdownItem to="/contact" onClick={handleDropdownItemClick}>Contact</DropdownItem>
              </Dropdown>
            </NavItem>
            <NavLink to="/process" onClick={handleScrollToTop}>How It Works</NavLink>
            <NavLink to="/faqs" onClick={handleScrollToTop}>FAQs</NavLink>
            <NavLink to="/partner" onClick={handleScrollToTop}>Become A Partner</NavLink>
            <NavLink to="/testimonials" onClick={handleScrollToTop}>Testimonials</NavLink>
            <ApplyButton to="/apply" onClick={handleScrollToTop}>Apply Now</ApplyButton>
          </NavLinks>
        </Nav>
      </HeaderContainer>
      <MobileApplyButton to="/apply" onClick={handleScrollToTop}>
        Apply Now - Get Funded Today
      </MobileApplyButton>
      <MobilePortalButtons>
        <PortalButton to="/customer-login">Customer Portal</PortalButton>
        <PortalLink to="/partner-dashboard">Partner Portal</PortalLink>
      </MobilePortalButtons>
    </>
  );
};

export default Header; 