export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value);
};

export const formatCurrencyCompact = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    notation: 'compact',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};