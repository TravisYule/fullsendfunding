const theme = {
  colors: {
    // ... existing colors
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    mobilePadding: '1rem',
    tabletPadding: '2rem',
    desktopPadding: '3rem',
  },
  touch: {
    minHeight: '44px', // iOS minimum
    tapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    userSelect: 'none',
  },
  animation: {
    tapScale: 0.98,
    hoverScale: 1.02,
    transition: '0.3s ease',
  },
  ios: {
    // iOS safe area insets
    topInset: '47px', // Status bar + notch
    bottomInset: '34px', // Home indicator
    inputHeight: '44px', // Apple's recommended minimum
    fontSize: '16px', // Prevents zoom on input focus
    borderRadius: '8px', // iOS-style rounded corners
    tapState: {
      duration: '0.1s',
      opacity: 0.7,
    }
  }
};

export default theme; 