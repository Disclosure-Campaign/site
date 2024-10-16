import React from 'react';
import _ from 'lodash';

import Card from 'components/card';

const cleanText = text => {
  var patterns = ['<p>', '</p>', '<strong>', '</strong>'];

  return _.reduce(patterns, (acc, pattern) => acc.replaceAll(pattern, ''), text);
}

const SummariesCard = ({entity: bill, delay, cardKey, infoCallback, focused}) => {
  const { summaries } = bill.dataGroups;

  return (
    <Card {...{delay, cardKey, infoCallback, focused}}>
      <p className='mb-2 font-bold'>Summaries:</p>
      {_.isEmpty(summaries) ? (
        <p className='mb-2'>
          No summaries available. Try entering bill title in your search engine.
        </p>
      ) : (
        _.map(summaries, ({text}) => (
          <p className=''>
            {cleanText(text)}
          </p>
        ))
      )}
    </Card>
  );
};

export default SummariesCard;