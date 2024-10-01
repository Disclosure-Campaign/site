import React from 'react';
import _ from 'lodash';

import Card from 'components/card';

const SummariesCard = ({entity: bill, delay, cardKey, infoCallback, focused}) => {
  const summaries = bill.dataGroups[cardKey];

  return (
    <Card {...{delay, cardKey, infoCallback, focused}}>
      <p className='mb-2 font-bold'>Summaries:</p>
      {_.isEmpty(summaries) ? (
        <p className=''>
          No summaries available. Try entering bill title in your search engine.
        </p>
      ) : (
        _.map(summaries, ({text}) => (
          <p className=''>
            {text}
          </p>
        ))
      )}
    </Card>
  );
};

export default SummariesCard;