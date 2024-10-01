import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { copy, styles } from 'global';
import SearchBar from 'components/searchBar';
import SuggestionBox from 'components/suggestionBox';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { sortedPoliticians } = useSelector(state => state.politicians);

  const handleSearchChange = useMemo(() => _.debounce(e => {
    setSearchTerm(e.target.value);
  }, 1000), []);

  var entities = sortedPoliticians || [];

  var filteredEntities =
    searchTerm === ''
      ? entities
      : _.filter(entities, ({fullName, candidateOfficeState, candidateOfficeDistrict}) => {
        console.log({candidateOfficeState, candidateOfficeDistrict})

        var match = isNaN(searchTerm) ?
          _.includes((fullName || '').toLowerCase(), searchTerm.toLowerCase()) :
          _.includes('f', 'g');

        return match;
      });

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