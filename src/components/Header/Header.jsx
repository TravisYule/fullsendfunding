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
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.base};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const TopBarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBarLeft = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
`;

const TopBarItem = styled.a`
  color: ${props => props.theme.colors.gray[300]};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: ${props => props.theme.transitions.base};
  
  &:hover {
    color: ${props => props.theme.colors.secondaryLight};
  }
`;

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  z-index: ${props => props.theme.zIndex.sticky};
  height: 90px;
  box-shadow: ${props => props.theme.shadows.base};
  top: 28px;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 70px;
    top: 45px;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.base};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.base};
  text-decoration: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.sm};
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
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.base};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing.base};
    box-shadow: ${props => props.theme.shadows.md};
    border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
    
    a {
      padding: ${props => props.theme.spacing.sm} 0;
      text-align: center;
      width: 100%;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: ${props => props.theme.transitions.base};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.base};
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const ApplyButton = styled(Link)`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.base};
  border-radius: ${props => props.theme.borderRadius.base};
  text-decoration: none;
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: ${props => props.theme.transitions.base};
  
  &:hover {
    background: ${props => props.theme.colors.secondaryDark};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
    margin: ${props => props.theme.spacing.sm} 0;
    text-align: center;
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
    background: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
    box-shadow: ${props => props.theme.shadows.lg};
    transition: ${props => props.theme.transitions.base};
    z-index: ${props => props.theme.zIndex.modal};
    overflow-y: auto;

    a {
      padding: ${props => props.theme.spacing.base};
      margin: ${props => props.theme.spacing.sm} 0;
      border-radius: ${props => props.theme.borderRadius.md};
      background: ${props => props.theme.colors.gray[100]};
      display: block;
      
      &:active {
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
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
    backdrop-filter: blur(4px);
    z-index: ${props => props.theme.zIndex.overlay};
  }
`;

const HamburgerButton = styled.button`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    position: absolute;
    right: ${props => props.theme.spacing.base};
    top: 50%;
    transform: translateY(-50%);
    z-index: ${props => props.theme.zIndex.dropdown};
    background: none;
    border: none;
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSizes.xl};
    cursor: pointer;
    transition: ${props => props.theme.transitions.base};
    border-radius: ${props => props.theme.borderRadius.base};
    
    &:hover {
      background: ${props => props.theme.colors.gray[100]};
    }
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
    color: ${props => props.theme.colors.white};
    text-align: center;
    padding: ${props => props.theme.spacing.base};
    font-weight: 600;
    z-index: ${props => props.theme.zIndex.sticky};
    box-shadow: ${props => props.theme.shadows.lg};
    font-size: ${props => props.theme.fontSizes.base};
    
    &:active {
      background: ${props => props.theme.colors.secondaryDark};
    }
  }
`;

const PortalButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.base};
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