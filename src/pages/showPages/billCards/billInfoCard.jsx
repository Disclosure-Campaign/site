import React from 'react';

import Card from 'components/card';

const BillInfoCard = ({entity: bill, delay, cardKey, infoCallback}) => {
  const {title, introducedDate, latestAction} = bill.dataGroups[cardKey];

  const props = {delay, cardKey, infoCallback};

  return (
    <Card {...props}>
      <p className='mb-2'><strong>{title}</strong></p>
      <p className='mb-2'>Introduced: {introducedDate}</p>
      <p className='mb-2'>Latest Update: {latestAction.text}</p>
    </Card>
  );
};

export default BillInfoCard;