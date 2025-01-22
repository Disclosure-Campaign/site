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
  }, 1500), []);

  useEffect(() => {
    var entities = sortedPoliticians || [];
    var _filteredEntities;

    if (searchTerm.length < 3) {
      _filteredEntities = entities;
    } else if (!isNaN(searchTerm)) {
      if (searchTerm.length === 5) {
        _filteredEntities = _.filter(entities, ({candidateOfficeState, candidateOfficeDistrict}) => (
          _.some(keyedZips[searchTerm], ({state, district}) => (
            (candidateOfficeDistrict === district) &&
            (candidateOfficeState === state))
          )
        ));
      }
    } else {
      _filteredEntities = _.filter(entities, ({fullName, nickname}) => (
        _.includes((fullName || '').toLowerCase(), searchTerm.toLowerCase()) ||
        _.includes((nickname || '').toLowerCase(), searchTerm.toLowerCase())
      ));
    }

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