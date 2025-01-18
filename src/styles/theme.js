const theme = {
  colors: {
    primary: '#1A1B3A',    // Deep Navy
    primaryLight: '#2A2C5A', // Lighter Navy
    primaryDark: '#12132B', // Darker Navy
    secondary: '#FF4B4B',  // Coral Red
    secondaryLight: '#FF6B6B', // Lighter Coral
    secondaryDark: '#E63939', // Darker Coral
    accent: '#6B4B8A',    // Purple
    accentLight: '#8B6BA0', // Lighter Purple
    accentDark: '#4B3560', // Darker Purple
    success: '#28A745',   // Green
    warning: '#FFC107',   // Yellow
    error: '#DC3545',     // Red
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      100: '#F8F9FA',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#999999',
    },
    background: {
      light: '#F5F7FA',
      dark: '#1A1B3A',
      gradient: 'linear-gradient(135deg, #1A1B3A 0%, #6B4B8A 100%)',
    }
  },
  fonts: {
    primary: "'Poppins', sans-serif",
    secondary: "'Open Sans', sans-serif"
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    md: '1.125rem',   // 18px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    '2xl': '1.875rem', // 30px
    '3xl': '2.25rem',  // 36px
    '4xl': '3rem',     // 48px
    '5xl': '4rem',     // 64px
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px'
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    base: '1rem',    // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 15px 30px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },
  transitions: {
    base: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  }
};

export default theme; 