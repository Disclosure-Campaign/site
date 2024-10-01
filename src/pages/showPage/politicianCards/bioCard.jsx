import React from 'react';

import Card from 'components/card';

import { styles } from 'global';

const BioCard = ({entity: politician, delay, cardKey, infoCallback, focused}) => {
  const { fullName, dataGroups } = politician;
  const { depictionImageUrl, party, currentTitle, candidateOfficeDistrict } = dataGroups[cardKey];

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
        <div className='w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center'>
          <span className='text-gray-500'>No Image Available</span>
        </div>
      )}
      {/* {depictionAttribution && (
        <span className='text-sm mb-2' dangerouslySetInnerHTML={{__html: depictionAttribution}} />
      )} */}
      <p className='mb-2'><strong>{politician.fullName}</strong> ({party})</p>
      <p className='mb-2'>{currentTitle} (District: {politician.candidateOfficeDistrict})</p>
    </Card>
  );
};

export default BioCard;