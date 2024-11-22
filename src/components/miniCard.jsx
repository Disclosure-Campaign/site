import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { UserIcon } from '@heroicons/react/24/outline';

import Loading from './loading';

import { styles } from 'global';

const MiniCard = ({fecId1, delay}) => {
  const { keyedPoliticians } = useSelector(state => state.politicians);
  const [isVisible, setIsVisible] = useState(false);
  const politician = _.get(keyedPoliticians, fecId1);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);

    return () => clearTimeout(timer);
  })

  var { fullName, currentTitle, party } = politician || {};

  const depictionImageUrl = _.get(
    politician, 'bio.depictionImageUrl',
    _.get(politician, 'depictionImageUrl')
  );

  const style = `
    p-2 m-1.5 max-sm:min-w-32 md:w-44 h-64 border border-gray-300 rounded-lg
    bg-gray-50 inline-block hover:shadow-xl
    transition-shadow duration-300 align-bottom
    ${isVisible ? 'opacity-100' : 'opacity-0'}
  `;

  return (
    <Link
      style={{transition: `opacity 1s ease ${delay}ms`}}
      to={`/politician/${fecId1}`}
      className={style}
    >
      {!politician ? (
        <Loading {...{height: 'h-16', width: 'w-16'}}/>
      ) : (
        <div>
          <div className='mb-2 h-32'>
            {depictionImageUrl ? (
              <img
                className={`max-h-32 h-full m-auto object-contain ${styles.border}`}
                src={depictionImageUrl}
                alt={`${fullName} depiction`}
              />
            ) : (
              <div className='relative'>
                <UserIcon className='m-auto absolute h-28 top-4 left-5'/>
              </div>
            )}
          </div>
          <div className='text-wrap text-sm'><strong>{fullName}</strong></div>
          {party && <div className='text-sm'>{party}</div>}
          <div className='text-wrap text-sm'>
            {currentTitle}
          </div>
        </div>
      )}
    </Link>
  );
};

export default MiniCard;
