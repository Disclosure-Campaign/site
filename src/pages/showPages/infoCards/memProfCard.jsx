import React from 'react';
import _ from 'lodash';

import Card from 'components/card';
import { formatCurrency } from 'helpers';

const MemProfCard = ({data, politician, delay}) => {
  const {assetLow, assetHigh, assets} = data;
  const {fullName} = politician;

  const totalHoldingsString = assetLow === assetHigh ?
    formatCurrency(assetLow) :
    `${formatCurrency(assetLow)} - ${formatCurrency(assetHigh)}`

  return (
    <Card {...{delay, dataSource: {name: 'OpenSecrets', link: 'www.opensecrets.org'}}}>
      <p className='text-gray-700 mb-2 font-bold'>Assets owned by {fullName}:</p>
      <p className='text-gray-700 mb-2'>
        Estimated total holdings: {totalHoldingsString}
      </p>
      {!_.isEmpty(assets) && (
        <div>
          <p className='text-gray-700 mb-2'>Individual assets (estimates):</p>
          <table className='w-full border-collapse border-spacing-0'>
            {_.map(assets, ({name, holdings_low, holdings_high, industry}, index) => (
              <tr key={index} className='border-b border-gray-100'>
                <td className='text-left p-1 text-gray-700 w-7/12'>
                  {name}{industry && industry !== 'Unknown' ? ` (industry: ${industry})` : ''}
                </td>
                <td className='text-right p-1 text-gray-700 w-5/12'>
                  {formatCurrency(holdings_low)} - {formatCurrency(holdings_high)}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </Card>
  );
}

export default MemProfCard;