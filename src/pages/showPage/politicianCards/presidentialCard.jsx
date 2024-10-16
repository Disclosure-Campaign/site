import React from 'react';
import _ from 'lodash';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import Card from 'components/card';

import { nameToSlug } from 'helpers';

var osBaseUrl = 'https://www.opensecrets.org/2024-presidential-race';

const PresidentialCard = ({entity: politician, delay, cardKey, focused}) => {
  const { fullName, opensecretsId } = _.extend(politician.dataGroups['bio'], politician);

  return (
    <Card {...{delay, cardKey, focused}}>
      <div className='mb-2 font-bold'>Resources about finances for the 2024 presidential campaigns</div>
      <div className='mb-2'>
        A full breakdown of {fullName}'s fundraising on <a
          href={`${osBaseUrl}/${nameToSlug(fullName)}/candidate?id=${opensecretsId}`}
          className='text-blue-500'
          rel='noopener noreferrer'
          target='_blank'
        >OpenSecrets.org</a>.
      </div>
      <p className='mb-2'>
        <a
            href={'https://www.nytimes.com/2024/09/01/us/elections/democratic-republican-political-donors.html'}
            className='text-blue-500'
            rel='noopener noreferrer'
            target='_blank'
          >A New York Times article
        </a> about major donors to the presidential candidates.
      </p>
      <p className='mb-2'>
        <a
            href={'https://www.cnn.com/politics/elections/presidential-candidates-money-raised-dg'}
            className='text-blue-500'
            rel='noopener noreferrer'
            target='_blank'
          >A continuously updated CNN report</a> on money raised by the presidential candidates (check out the "outside committees" tab).
      </p>
      <p className='mb-2'>
        The Federal Election Commission's <a
            href={'https://www.fec.gov/introduction-campaign-finance/understanding-ways-support-federal-candidates/presidential-elections/public-funding-presidential-elections'}
            className='text-blue-500'
            rel='noopener noreferrer'
            target='_blank'
          >webpage</a> on public funding for presidential campaigns.
      </p>
    </Card>
  );
};

export default PresidentialCard;