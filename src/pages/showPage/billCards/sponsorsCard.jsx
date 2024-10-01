import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Card from 'components/card';
import Loading from 'components/loading';

const SponsorsCard = ({entity: bill, delay, cardKey, infoCallback, focused}) => {
  const {keyedPoliticians} = useSelector(state => state.politicians);

  const sponsors = _.map(_.get(bill, 'dataGroups.bill.sponsors', []), ({bioguideId}) => _.find(keyedPoliticians, {bioguideId}));

  return (
    keyedPoliticians ? (
      <Card {...{delay, cardKey, infoCallback, focused}}>
        <p className='mb-2 font-bold'>Sponsors:</p>
        {_.map(sponsors, ({fecId1, fullName, party}) => (
          <Link to={`/politician/${fecId1}`} className='flex flex-row text-blue-500'>
            {fullName} ({party})
          </Link>
        ))}
      </Card>
    ) : (
      <Loading/>
    )
  );
};

export default SponsorsCard;