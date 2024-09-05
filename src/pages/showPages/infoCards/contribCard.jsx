import React from 'react';
import _ from 'lodash';

import Card from 'components/card';
import { formatCurrency } from 'helpers';

const ContribCard = ({data, politician, delay}) => {
  var {fullName} = politician;

  return (
    <Card {...{delay, dataSource: {name: 'OpenSecrets', link: 'www.opensecrets.org'}}}>
      <p className='text-gray-700 mb-2 font-bold'>Top Contributors to {fullName}:</p>
      <table className='w-full border-collapse border-spacing-0'>
        <tbody>
          {_.map(data, ({org, total}, index) => (
            <tr key={index} className='border-b border-gray-100'>
              <td className='text-left p-1 text-gray-700'>{org}</td>
              <td className='text-right p-1 text-gray-700'>{formatCurrency(total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ContribCard;