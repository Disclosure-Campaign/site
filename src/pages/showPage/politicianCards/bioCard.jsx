import React from 'react';
import _ from 'lodash';

import Card from 'components/card';

import { UserIcon } from '@heroicons/react/24/outline';

import { styles } from 'global';

const BioCard = ({entity: politician, delay, cardKey, infoCallback, focused}) => {
  politician = _.extend(_.get(politician, 'dataGroups.bio'), politician);

  const { fullName, party, currentTitle, depictionImageUrl } = politician;

  return (
    <Card {...{delay, cardKey, infoCallback, focused}}>
      {depictionImageUrl ? (
        <div className='w-2/3 p-4'>
          <img
            className={`w-full h-auto object-contain ${styles.border}`}
            alt={`${fullName} depiction`}
            src={depictionImageUrl}
          />
        </div>
      ) : (
        <div className='w-full h-64 bg-gray-200 rounded mb-3 flex items-center justify-center'>
          <UserIcon className='w-2/3 h-64 p-4'/>
        </div>
      )}
      {/* {depictionAttribution && (
        <span className='text-sm mb-2' dangerouslySetInnerHTML={{__html: depictionAttribution}} />
      )} */}
      <p className='mb-2'><strong>{fullName}</strong> ({party})</p>
      <p className='mb-2'>
        {currentTitle}
      </p>
    </Card>
  );
};

export default BioCard;