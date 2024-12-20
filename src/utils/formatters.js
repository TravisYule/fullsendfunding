export const formatCurrency = (value) => {
  // Remove non-digits
  const digits = value.replace(/\D/g, '');
  // Format as currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(digits || 0);
};

// Convert formatted string back to number
export const parseCurrency = (value) => {
  return value.replace(/[^0-9.-]+/g, '');
}; 