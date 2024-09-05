import React from 'react';

import Card from 'components/card';

const BioCard = ({data, politician, delay}) => {
  const { fullName, depictionImageUrl, party, currentTitle } = data;

  return (
    <Card {...{delay, dataSource: {name: 'Congress.gov', link: 'www.congress.gov'}}}>
      {depictionImageUrl ? (
        <div className='w-2/3 p-4'>
          <img
            src={depictionImageUrl}
            alt={`${fullName} depiction`}
            className='w-full h-auto object-contain'
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
      <p className='mb-2'>{currentTitle}</p>
    </Card>
  );
};

export default BioCard;