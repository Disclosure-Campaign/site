import React from 'react';
import _ from 'lodash';

import Card from 'components/card';

import { formatCurrency } from 'helpers';

const OrgCard = ({entity: org, delay, cardKey, infoCallback, focused}) => {
  const {dems, repubs, gave_to_cand, gave_to_pac, gave_to_party, total} = org.dataGroups['org'];

  const copyFromNum = num => {
    num = parseInt(num)

    return num !== 0 && num !== parseInt(total) ?
      `${formatCurrency(num)} (${Math.round(num/total*100)}%)` :
      formatCurrency(num);
  }

  const rows = [
    {
      text: 'Total contributions',
      figure: formatCurrency(total)
    },
    {
      text: 'Contributions to Democratic candidates and party committees',
      figure: copyFromNum(dems)
    },
    {
      text: 'Contributions to Republican candidates and party committees',
      figure: copyFromNum(repubs)
    },
    {
      text: 'Contributions to PACS',
      figure: copyFromNum(gave_to_pac)
    },
    {
      text: 'Contributions to party committees',
      figure: copyFromNum(gave_to_party)
    },
    {
      text: 'Contributions to candidates',
      figure: copyFromNum(gave_to_cand)
    },

  ]

  return (
    <Card {...{delay, cardKey, infoCallback, focused}}>
      <p className='mb-2'><strong>Spending Breakdown</strong></p>
      <table className='w-full border-collapse border-spacing-0'>
        <tbody>
          {_.map(rows, ({text, figure}, index) => (
            <tr key={index} className='border-b border-gray-100'>
              <td className='text-left p-1 text-gray-700'>{text}</td>
              <td className='text-right p-1 text-gray-700'>{figure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default OrgCard;