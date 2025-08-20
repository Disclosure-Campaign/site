import _ from 'lodash';
import { keyIdMap } from 'global';

import { requestPoliticianDetails } from './redux/actions';

export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}).format(amount);

export const extractBillVars = url => {
  const baseRemoved = (url || '').replace('https://api.congress.gov/v3/bill/', '');
  const queryRemoved = baseRemoved.split('?')[0];
  const [congress, type, id] = queryRemoved.split('/');

  return {congress, type, id};
}

export const nameToSlug = name => (name || '').toLowerCase().replace(/[.,]/g, ' ').replace(/\s+/g, '-');

const allGroups = [
  // 'bio', 'candContrib', 'sponsoredLegislation',
  // 'memProf', 'cosponsoredLegislation'
  'bio', 'sponsoredLegislation',
  'cosponsoredLegislation'
];

export const requestMultipleDataGroups = ({dispatch, politician, groups}) => {
  groups = groups === 'all' ? allGroups : groups;

  groups = _.filter(groups, groupKey => (
    politician[keyIdMap['politician'][groupKey]] && !politician[groupKey]
  ));

  _.forEach(groups, dataGroup => {
    dispatch(requestPoliticianDetails({
      politicianIds: [politician.fecId1],
      dataGroup
    }));
  });
}
