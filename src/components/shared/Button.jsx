const Button = styled.button`
  // ... existing styles ...
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 44px; // Minimum touch target size
    padding: 12px 24px; // Larger padding for better touch targets
  }
`; 