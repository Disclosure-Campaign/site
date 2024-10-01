import React from 'react';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import Card from 'components/card';

import { formatCurrency, nameToSlug } from 'helpers';

const OrgCard = ({entity: org, delay, cardKey, infoCallback, focused}) => {
  const {orgname: orgName, orgid: orgId, total} = org.dataGroups[cardKey];

  return (
    <Card {...{delay, cardKey, infoCallback, focused}}>
      <p className='mb-2'><strong>{orgName}</strong></p>
      <p className='mb-2'>Total contributions: {formatCurrency(total)}</p>
      <div className='flex'>
        <p className='mb-2'>See more on</p>
        <a
          href={`https://www.opensecrets.org/orgs/${nameToSlug(orgName)}/summary?all=2024&id=${orgId}`}
          className='flex ml-1 text-blue-500'
          rel='noopener noreferrer'
          target='_blank'
        >
          <div>OpenSecrets.org</div>
          <div className='ml-1 py-1 h-4 w-4 rounded-full'>
            <ArrowTopRightOnSquareIcon/>
          </div>
        </a>
      </div>
    </Card>
  );
};

export default OrgCard;