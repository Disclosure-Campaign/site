import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { copy, styles } from 'global';
import SearchBar from 'components/searchBar';
import SuggestionBox from 'components/suggestionBox';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntities, setFilteredEntities] = useState([]);
  const { sortedPoliticians } = useSelector(state => state.politicians);
  const { keyedZips } = useSelector(state => state.zips);

  const handleSearchChange = useMemo(() => _.debounce(searchTerm => {
    setSearchTerm(searchTerm);
  }, 1000), []);

  useEffect(() => {
    var entities = sortedPoliticians || [];

    var _filteredEntities =
      searchTerm === ''
        ? entities
        : _.filter(entities, ({fullName, candidateOfficeState, candidateOfficeDistrict}) => {
          var match = false;

          if ((!isNaN(searchTerm)) && (searchTerm.length === 5)) {
            var possibleMatches = keyedZips[searchTerm];

            _.forEach(possibleMatches, ({state, district}) => {
              if ((candidateOfficeState === state) && (candidateOfficeDistrict === district)) {
                match = true;
              }
            });

          } else {
            match = _.includes((fullName || '').toLowerCase(), searchTerm.toLowerCase());
          }

          return match;
        });

    setFilteredEntities(_filteredEntities);
  }, [sortedPoliticians, searchTerm]);

  return (
    <div className={`min-h-screen flex flex-col items-center bg-gray-100 ${styles.border} p-4`}>
      <main className="flex flex-col items-center w-full mt-8 md:mt-16">
        <h1 className="text-2xl font-bold mb-16">{copy.introText}</h1>
        <SearchBar {...{searchTerm, handleSearchChange, filteredEntities}}/>
        <SuggestionBox {...{searchTerm, filteredEntities}}/>
      </main>
    </div>
  );
};

export default Home;