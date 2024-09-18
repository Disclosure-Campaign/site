export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}).format(amount);

export const extractBillVars = url => {
  const baseRemoved = url.replace('https://api.congress.gov/v3/bill/', '');
  const queryRemoved = baseRemoved.split('?')[0];
  const [congress, type, id] = queryRemoved.split('/');

  return {congress, type, id};
}

export const nameToSlug = name => name.toLowerCase().replace(/\s+/g, '-');
