import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Loading from './loading';

import { requestPoliticianDetails } from '../redux/actions';
import { styles } from 'global';

const MiniCard = ({suggestion: politician, delay}) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const {
    id, fullName, currentTitle, party,
    candidateOfficeDistrict,
    depictionImageUrl
  } = politician;

  const memoizedAddPoliticianDetails = useCallback(id => {
    // dispatch(requestPoliticianDetails(id));
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);

    if (!politician.dataGroups) {
      try {
        const setPoliticianDetails = () => {
          memoizedAddPoliticianDetails(id);
        }

        setPoliticianDetails();
      }
      catch(error) {
        // setTimeout(() => setNotFound(true), 500);
      }
    }

    return () => clearTimeout(timer);
  }, [politician]);

  const style = `
    p-2 m-1 w-44 h-64 border border-gray-300 rounded-lg
    bg-gray-50 inline-block shadow-lg hover:shadow-xl
    transition-shadow duration-300
    ${isVisible ? 'opacity-100' : 'opacity-0'}
  `;

  return (
    <div
      style={{transition: `opacity 1s ease ${delay}ms`}}
      className={style}
    >
      {!politician.dataGroups ? (
        <Loading {...{height: 'h-16', width: 'w-16'}}/>
      ) : (
        <div>
          <div className='w-2/3 p-4'>
            <img
              className={`w-full h-auto object-contain ${styles.border}`}
              alt={`${fullName} depiction`}
              src={depictionImageUrl}
            />
          </div>
          <p className='mb-2'><strong>{fullName}</strong> ({party})</p>
          <p className='mb-2'>{currentTitle} (District: {candidateOfficeDistrict})</p>
        </div>
      )}
    </div>
  );
};

export default MiniCard;
