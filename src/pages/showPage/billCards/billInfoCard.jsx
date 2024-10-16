import React from 'react';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import Card from 'components/card';

const baseUrl = 'https://www.congress.gov/bill';

const BillInfoCard = ({entity: bill, delay, cardKey, infoCallback, focused}) => {
  const {
    title, introducedDate, latestAction, congress,
    originChamber, number
  } = bill.dataGroups[cardKey];

  const congressGovUrl = `${baseUrl}/${congress}th-congress/${originChamber.toLowerCase()}-bill/${number}`;

  return (
    <Card {...{delay, cardKey, infoCallback, focused}}>
      <p className='mb-2'><strong>{title}</strong></p>
      <p className='mb-2'>Introduced: {introducedDate}</p>
      <p className='mb-2'>Latest Update: {latestAction.text}</p>
      <a
        className='flex text-blue-500 mb-2'
        rel='noopener noreferrer'
        href={congressGovUrl}
        target='_blank'
      >
        <p className='mb-2 border-b'>View more information on Congress.gov</p>
          <div className='ml-1 py-1 h-4 w-4 rounded-full'>
            <ArrowTopRightOnSquareIcon/>
          </div>
      </a>
    </Card>
  );
};

export default BillInfoCard;


// https://www.congress.gov/bill/118th-congress/senate-bill/1775