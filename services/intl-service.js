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
    notation: value > 100000 ? 'compact' : 'standard',
    currency: 'USD',
    maximumFractionDigits: value >= 1000000 ? 2 : 0
  }).format(value);
};