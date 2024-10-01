import React, { useEffect, useState } from 'react';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import { styles, copy, cardSourceMap } from 'global';

const Card = ({children, delay=0, width, cardKey, infoCallback, focused}) => {
  const [isVisible, setIsVisible] = useState(false);
  const dataSource = copy.dataSources[cardSourceMap[cardKey]];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const cardStyle = `
    bg-white p-5 rounded-lg shadow-lg hover:shadow-xl
    transition-shadow duration-300 overflow-y-auto
    mb-4 relative
    ${isVisible ? 'opacity-100' : 'opacity-0'}
    ${focused ? `border-2 border-${styles.primaryColor}` : ''}
  `;

  return (
    <div
      className={cardStyle}
      style={{
        transition: `opacity 1s ease ${delay}ms`,
        width: width || '400px'
      }}
    >
      {infoCallback && (
        <div
          onClick={() => infoCallback({cardKey})}
          className={`absolute top-2 right-2 h-5 w-5 ${styles.clickable}`}
        >
          <InformationCircleIcon/>
        </div>
      )}
      <div>{children}</div>
      {dataSource && (
        <div className='border-t pt-3 mt-auto'>
          {dataSource.baseUrl ? (
            <div className='flex flex-row'>
              <div className='text-sm'>Data Source:</div>
              <a
                className='text-blue-500 hover:underline text-sm pl-1 flex flex-row'
                href={`https://${dataSource.baseUrl}`}
                rel='noopener noreferrer'
                target='_blank'
              >
                {dataSource.name}
                <div className='ml-1 py-0.5 h-3.5 w-3.5 rounded-full'>
                  <ArrowTopRightOnSquareIcon />
                </div>
              </a>
            </div>
          ) : (
            <p className='text-gray-500 text-sm'>Data Source: {dataSource.name}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;