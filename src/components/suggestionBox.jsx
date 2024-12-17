import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { requestPoliticianDetails } from '../redux/actions';

import MiniCard from 'components/miniCard';

const SuggestionBox = ({searchTerm, filteredEntities}) => {
  const dispatch = useDispatch();
  const [visibleSuggestionIds, setVisibleSuggestionIds] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const memoizedAddPoliticianDetails = useCallback(ids => {
    dispatch(requestPoliticianDetails({
      politicianIds: ids,
      dataGroup: 'bio'
    }));
  }, [dispatch]);

  useEffect(() => {
    var ids = [];

    if (!searchTerm) {
      ids = _.slice(_.shuffle([
        'P80001571', // Trump
        'P00009423', // Harris
        'H6LA04138', // Mike Johnson
        'H8CA05035', // Nancy Pelosi
        'H0CA27085', // Adam Schiff
        'H6MD08457', // Jamie Raskin
        'H6KY01110', // James Comer
        'H6OH04082', // Jim Jordan
        'H2NY10092', // Hakeem Jeffries
        'H4MA05084', // Katherine Clark
        'H2CA31125', // Pete Aguilar
        'H4CA33119', // Ted Lieu
        'H4NY21079', // Elise Stephanik
        'H0LA01087', // Steve Scalise
        'H4MN06087', // Tom Emmer
        'S2TX00312', // Ted Cruz
        'S0SC00149', // Lindsey Graham
      ]), 0, 4);

    } else {
      ids = _.map(_.sortBy(filteredEntities, 'bioguideId'), 'fecId1');

      if (ids.length > 8) ids = _.slice(ids, 0, 8);
    }

    if (!_.isEmpty(ids)) {
      try {
        const setPoliticianDetails = () => {
          memoizedAddPoliticianDetails(ids);
        }

        setPoliticianDetails();
      } catch(error) {
        setTimeout(() => setNotFound(true), 500);
      }
    }

    setVisibleSuggestionIds(ids);
  }, [memoizedAddPoliticianDetails, filteredEntities, searchTerm]);

  const containerStyles = `
    text-nowrap w-full max-w-3xl mt-10 p-1
    bg-white border border-gray-300 rounded-lg
    overflow-x-auto overflow-hidden h-70
    transition-all max-sm:flex max-sm:align-center
    ${visibleSuggestionIds.length > 4 ? 'scrollable' : ''}
  `;

  return (
    <div className={containerStyles}>
      {_.map(visibleSuggestionIds, (fecId1, index) => (
        <MiniCard
          {...{delay: index * 150, fecId1}}
          key={fecId1}
        />
      ))}
    </div>
  );
};

export default SuggestionBox;