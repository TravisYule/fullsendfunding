import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
`;

const Text = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const List = styled.ol`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Terms = () => {
  return (
    <Section>
      <Container>
        <Title>Terms and Conditions</Title>
        
        <SubTitle>Terms of Use – Updated effective March 31, 2023</SubTitle>
        
        <Text>
          This is a legal agreement ("Agreement") between you and Full Send Funding, a New York company ("Full Send Funding"), 
          which may be contacted at 10 Ashlor Drive, Middle Grove, New York. By accessing the website and using any of 
          the Services (as defined below) accessible though the Site, you become a user and agree to, and are bound by, 
          the terms and conditions of this Agreement for as long as you continue to use the Site or Services.
        </Text>

        <Text>
          Full Send Funding matches qualified small business owners with alternative lending sources. Through a proprietary 
          matching technology, Full Send Funding helps business owners to identify the business loan category and specific 
          lender(s) that offer the best opportunity for that business owner to prepare for and acquire a business loan. 
          Once prepared, small business owners are then introduced to the most appropriate lending source.
        </Text>

        <Text>
          This Agreement is subject to change by Full Send Funding in its sole discretion at any time, with or without notice. 
          Your continued use of this Site or the Services after the posting of revisions to this Agreement will constitute 
          your acceptance of such revisions. Please consult the end of this Agreement to determine when the Agreement was 
          last revised.
        </Text>

        <Text>
          Full Send Funding is licensed as set forth in the Licenses and Disclosures section, which is incorporated into 
          this Agreement by reference.
        </Text>

        <List>
          <ListItem>Defined terms</ListItem>
          <ListItem>Use of Site and Service</ListItem>
          <ListItem>Proprietary Rights</ListItem>
          <ListItem>User Information</ListItem>
          <ListItem>Services</ListItem>
          <ListItem>Links to Third-Party Websites/Dealings with Advertisers and Sponsors</ListItem>
          <ListItem>Lender Terms</ListItem>
          <ListItem>Disclaimer of Warranty</ListItem>
          <ListItem>Limitation of Liability</ListItem>
          <ListItem>Indemnification</ListItem>
          <ListItem>Communication and Privacy</ListItem>
          <ListItem>Term and Termination</ListItem>
          <ListItem>Cancellation</ListItem>
          <ListItem>General Provisions</ListItem>
          <ListItem>Revision Date</ListItem>
        </List>

        <SubTitle>1. Defined Terms</SubTitle>
        <Text>
          As used in this Agreement, the following words shall have the following meanings. "Full Send Funding" includes "Full Send Funding", "we", "us" 
          and variations such as "our". "Service" includes the products, services and software that you order, receive 
          or access as part of the service.
        </Text>

        <SubTitle>2. Use of Site and Service</SubTitle>
        <Text>
          As a user of the Site or a user registered to use any of the Services (a "Registered User"), you agree to 
          the following:
        </Text>

        <SubTitle>3. Proprietary Rights</SubTitle>
        <Text>
          a. Ownership of Proprietary Information. You hereby acknowledge and agree that Full Send Funding is the owner of all rights in and to the Site and Services. These proprietary rights are protected by federal, state and local laws and regulations. You are permitted to use the Site and Services only as expressly authorized by this Agreement. You may not copy, reproduce, distribute or create derivative works, reverse engineer or reverse compile any of the Site or Services or technology.
        </Text>
        <Text>
          b. No Use of Confidential Information. You will not post, copy, modify, transmit, disclose, show in public, create any derivative works from, distribute, make commercial use of, or reproduce in any way any (i) confidential information or (ii) other copyrighted material, trademarks, or other proprietary information accessible via the Site or Services, without first obtaining the prior written consent of the owner of such proprietary rights.
        </Text>
        <Text>
          c. License to Provided Content. By providing information or content to any account or public area of the Site or Service, you automatically grant, and you represent and warrant that you have the right to grant, to Full Send Funding and its users, an irrevocable, perpetual, non-exclusive, fully-paid, worldwide license to use, reproduce, publicly perform, publicly display and distribute such information and content, and to prepare derivative works of, or incorporate into other works, such information and content, and to grant and authorize sub-licenses of the foregoing.
        </Text>

        <SubTitle>4. User Information</SubTitle>
        <Text>
          a. Privacy Policy. For information about the collection and possible use of information and material provided by you, please click on Full Send Funding's Privacy Policy located on the Site. The Privacy Policy is hereby incorporated by reference into this Agreement. By using the Site or the Services, you are consenting to the terms of Full Send Funding's Privacy Policy.
        </Text>

        <SubTitle>5. Services</SubTitle>
        <Text>
          Full Send Funding offers subscription services, each of which is explained in more detail below. Further product, subscription and services descriptions are provided through the Site and are made a part of this Agreement by reference.
        </Text>
        <Text>
          a. The Free Membership Plan. This is a free subscription that occurs when you complete the loan profile on the Site. This membership may provide various lender matches. You will receive contact information for the lender matches and you may apply directly with the lender from the lender match for a business loan product. You will also have access to customer service representatives via chat to assist you with certain questions. Full Send Funding does not make any guarantee of the number of lender matches each customer may or will have.
        </Text>

        <SubTitle>6. Links to Third-Party Websites and Dealings with Advertisers and Sponsors</SubTitle>
        <Text>
          The Site and Services may contain links to websites of third-parties, including without limitation, advertisers, which are not under the control of Full Send Funding, and Full Send Funding is not responsible for the content of any linked site or any link contained in a linked site, or any changes or updates to such websites. Full Send Funding provides these links to you as a convenience, and the inclusion of any link does not imply that Full Send Funding endorses or accepts any responsibility for the content on such third-party website. Your correspondence or business dealings with, or participation in promotions of, advertisers or third-parties found on or through the Site or Services are solely between you and such advertiser or third-party. You agree that Full Send Funding will not be responsible or liable for any loss or damage of any sort incurred as the result of the presence of such advertisers on the Site or Services. Please visit our Privacy Policy to learn more about how we use your information.
        </Text>

        <SubTitle>7. Lender Terms</SubTitle>
        <Text>
          The following terms apply to a lender or potential lender that accesses the Site. All other terms also apply to a lender or potential lender.
        </Text>
        <Text>
          a. Access to the Site. Access to the Site will be on a limited basis in accordance with the Lender Package purchased. A lender or potential lender may not exceed the limits of the Lender Package purchased. In the event a lender or potential lender exceeds the limits set forth in the Lender Package purchased, such lender or potential lender shall be prohibited from future access to the Site.
        </Text>
        <Text>
          b. Access to Client Information. A lender or potential lender may only access client information for the purpose of providing business loans. Lenders or potential lenders are explicitly restricted from accessing the Site or client information for the purpose of providing personal loans for personal, family or household use.
        </Text>
        <Text>
          c. Client Information. A lender or potential lender that accesses the Site and/or purchases a Lender Package and accesses Client Information does so at its own risk. Full Send Funding makes no representations or guarantees as to the accuracy, validity or legitimacy of the Client Information. Full Send Funding disclaims any and all potential liability as to the use of the Client Information. Full Send Funding does not guarantee the ability of a client being prepared to receive or be approved for any particular loan product or amount.
        </Text>

        <SubTitle>8. Disclaimer of Warranty</SubTitle>
        <Text>
          a. No Warranties. THIS SECTION WILL APPLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW. FULL SEND FUNDING 
          PROVIDES THE SERVICES ON AN "AS IS" AND "AS AVAILABLE" BASIS AND GRANTS NO WARRANTIES OF ANY KIND, WHETHER EXPRESS, 
          IMPLIED, STATUTORY OR OTHERWISE WITH RESPECT TO THE SERVICES OR THE SITE (INCLUDING ALL INFORMATION CONTAINED THEREIN), 
          INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT.
        </Text>

        <SubTitle>9. Limitation of Liability</SubTitle>
        <Text>
          a. Incidental Damages and Aggregate Liability. IN NO EVENT WILL FULL SEND FUNDING BE LIABLE FOR ANY INCIDENTAL, SPECIAL, CONSEQUENTIAL OR INDIRECT DAMAGES ARISING OUT OF OR RELATING TO THE USE OR INABILITY TO USE THE SERVICES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OR CORRUPTION OF DATA OR PROGRAMS, SERVICE INTERRUPTIONS AND PROCUREMENT OF SUBSTITUTE SERVICES, EVEN IF FULL SEND FUNDING KNOWS OR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </Text>
        <Text>
          b. No Liability for non-Full Send Funding Actions. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL FULL SEND FUNDING BE LIABLE FOR ANY DAMAGES WHATSOEVER, WHETHER DIRECT, INDIRECT, GENERAL, SPECIAL, COMPENSATORY, CONSEQUENTIAL, AND/OR INCIDENTAL, ARISING OUT OF OR RELATING TO THE CONDUCT OF YOU OR ANYONE ELSE IN CONNECTION WITH THE USE OF THE SERVICES.
        </Text>
        <Text>
          c. Information Verification. Full Send Funding and its contractors may use various ways of verifying information that users have provided. However, none of those ways are perfect, and you agree that Full Send Funding and its contractors will have no liability to you arising from any incorrectly verified information.
        </Text>

        <SubTitle>10. Indemnification</SubTitle>
        <Text>
          You agree to indemnify, defend and hold harmless Full Send Funding, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorneys' fees) relating to or arising out of (i) your use of or inability to use the Site or Services, (ii) any user postings made by you, (iii) your violation of any terms of this Agreement or your violation of any rights of a third-party, or (iv) your violation of any applicable laws, rules or regulations. Full Send Funding reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with Full Send Funding in asserting any available defenses.
        </Text>

        <SubTitle>11. Communication and Privacy</SubTitle>
        <Text>
          We may use your email address to send you messages notifying you of important changes to the Services or special offers. Further, we may contact you by telephone if you voluntarily provide us with your telephone number, in order to communicate with you regarding the Services. If you do not want to receive such email messages or telephone calls, please refer to our Privacy Policy to review your options.
        </Text>

        <SubTitle>12. Term and Termination</SubTitle>
        <Text>
          This agreement will become effective upon your acceptance of the Agreement by your use of the Site or Services and will remain in effect in perpetuity unless terminated hereunder. Either you or Full Send Funding may terminate your account at any time, for any reason or no reason, without explanation, effective upon written notice to the other party. Full Send Funding reserves the right to immediately suspend or terminate your access to any of the Services, without notice, for any reason or no reason. We also reserve the right to remove your account information or data from our Services and any other records at any time at our sole discretion. In the event your access to any of the Services is suspended due to the breach of this Agreement, you agree that all fees then paid to Full Send Funding by you will be nonrefundable and all outstanding or pending payments will immediately be due.
        </Text>

        <SubTitle>13. Cancellations</SubTitle>
        <Text>
          You may cancel your profile at any time by contacting Customer Service at 518-312-0382.
        </Text>

        <SubTitle>14. General Provisions</SubTitle>
        <Text>
          a. Controlling Law and Jurisdiction. You agree that New York law (without giving effect to its conflicts of law 
          principles) will govern this Agreement, the Site and the Services and that any dispute arising out of or relating 
          to this Agreement, the Site or the Services will be subject to the exclusive jurisdiction and venue of the federal 
          and state courts in New York.
        </Text>

        <SubTitle>15. Revision Date</SubTitle>
        <Text>
          This Agreement was last revised on March 31, 2023.
        </Text>
      </Container>
    </Section>
  );
};

export default Terms; 