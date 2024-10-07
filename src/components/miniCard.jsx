import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { UserIcon } from '@heroicons/react/24/outline';

import Loading from './loading';

import { requestPoliticianDetails } from '../redux/actions';
import { styles } from 'global';

const MiniCard = ({fecId1, delay}) => {
  const dispatch = useDispatch();
  const { keyedPoliticians } = useSelector(state => state.politicians);

  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const politician = keyedPoliticians[fecId1];

  var {
    fullName, currentTitle, party,
    candidateOfficeDistrict: district,
    candidateOfficeState: state,
    candidateOffice: office
  } = politician || {};

  if (currentTitle) {
    currentTitle += district !== '00' && ` (District ${district})`;
  } else {
    currentTitle = `Candidate for ${state} ${office === 'S' ? 'Senator' : `Representative (District ${district})`}`;
  }

  const memoizedAddPoliticianDetails = useCallback(fecId1 => {
    dispatch(requestPoliticianDetails(fecId1));
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);

    if (!_.get(politician, 'dataGroups')) {
      try {
        const setPoliticianDetails = () => {
          memoizedAddPoliticianDetails(fecId1);
        }

        setPoliticianDetails();
      } catch(error) {
        setTimeout(() => setNotFound(true), 500);
      }
    }

    return () => clearTimeout(timer);
  }, [politician, delay, fecId1, memoizedAddPoliticianDetails]);

  const style = `
    p-3 m-2 w-44 h-64 border border-gray-300 rounded-lg
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
      {!_.get(politician, 'dataGroups') ? (
        <Loading {...{height: 'h-16', width: 'w-16'}}/>
      ) : (
        <div>
          <div className='mb-2 h-32'>
            {_.get(politician, 'dataGroups.bio.depictionImageUrl') ? (
              <img
                className={`max-h-32 h-full m-auto object-contain ${styles.border}`}
                src={politician.dataGroups.bio.depictionImageUrl}
                alt={`${fullName} depiction`}
              />
            ) : (
              <div className='relative'>
                <UserIcon className='m-auto absolute h-28 top-4 left-4'/>
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
