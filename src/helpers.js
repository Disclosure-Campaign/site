export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}).format(amount);
