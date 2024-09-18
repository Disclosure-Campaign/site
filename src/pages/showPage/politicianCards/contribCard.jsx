import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Card from 'components/card';

import { formatCurrency, nameToSlug } from 'helpers';

const ContribCard = ({entity: politician, delay, cardKey, infoCallback}) => {
  const {fullName, dataGroups} = politician;
  const orgData = dataGroups[cardKey];

  return (
    <Card {...{delay, cardKey, infoCallback}}>
      <p className='text-gray-700 mb-2 font-bold'>Top Contributors to {fullName}:</p>
      <table className='w-full border-collapse border-spacing-0'>
        <tbody>
          {_.map(orgData, ({org, total}, index) => (
            <tr key={index} className='border-b border-gray-100'>
              <td className='text-left p-1 text-blue-500'>
                <Link to={`/organization/${nameToSlug(org)}`}>{org}</Link>
              </td>
              <td className='text-right p-1 text-gray-700'>{formatCurrency(total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ContribCard;