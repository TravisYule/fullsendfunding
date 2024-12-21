import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 4rem 2rem 2rem;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  position: relative;
  left: 50%;
  right: 50%;
  box-sizing: border-box;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const ContactInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const BBBSection = styled.div`
  margin-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Loans and Financing</h3>
          <FooterList>
            <li><FooterLink to="/apply">Small Business Loans</FooterLink></li>
            <li><FooterLink to="/apply">Bad Credit Business Loans</FooterLink></li>
            <li><FooterLink to="/apply">Merchant Cash Advance</FooterLink></li>
            <li><FooterLink to="/apply">Unsecured Business Loans</FooterLink></li>
            <li><FooterLink to="/apply">Equipment Financing</FooterLink></li>
            <li><FooterLink to="/apply">Fast Cash Business Loans</FooterLink></li>
            <li><FooterLink to="/apply">Minority Business Loans</FooterLink></li>
            <li><FooterLink to="/apply">No Collateral Loans</FooterLink></li>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <h3>Industries We Service</h3>
          <FooterList>
            <li><FooterLink to="/apply">Automotive Business Loans</FooterLink></li>
            <li><FooterLink to="/apply">Beauty Salon Financing</FooterLink></li>
            <li><FooterLink to="/apply">Construction Financing</FooterLink></li>
            <li><FooterLink to="/apply">Dentistry Financing</FooterLink></li>
            <li><FooterLink to="/apply">Hotel and Motel Financing</FooterLink></li>
            <li><FooterLink to="/apply">Medical Financing</FooterLink></li>
            <li><FooterLink to="/apply">Restaurant Financing</FooterLink></li>
            <li><FooterLink to="/apply">Retail Financing</FooterLink></li>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <h3>About Us</h3>
          <FooterList>
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/faqs">FAQs</FooterLink></li>
            <li><FooterLink to="/contact">Contact Us</FooterLink></li>
            <li><FooterLink to="/process">How it works</FooterLink></li>
            <li><FooterLink to="/partner">Become A Partner</FooterLink></li>
            <li><FooterLink to="/testimonials">Testimonials</FooterLink></li>
            <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
            <li><FooterLink to="/terms">Terms and Conditions</FooterLink></li>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            Full Send Funding<br />
            10 Ashlor Drive<br />
            Middle Grove, New York<br />
            <br />
            <a href="tel:518-312-0382" style={{ color: 'inherit', textDecoration: 'none' }}>518-312-0382</a><br />
            <a href="mailto:travis@fullsendfunding.com" style={{ color: 'inherit', textDecoration: 'none' }}>travis@fullsendfunding.com</a>
          </ContactInfo>
          <SocialLinks>
            <SocialIcon href="#" target="_blank"><FaFacebookF /></SocialIcon>
            <SocialIcon href="#" target="_blank"><FaGoogle /></SocialIcon>
            <SocialIcon href="#" target="_blank"><FaLinkedinIn /></SocialIcon>
            <SocialIcon href="#" target="_blank"><FaTwitter /></SocialIcon>
          </SocialLinks>
          <BBBSection>
            {/* Add BBB logo/link here */}
          </BBBSection>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 