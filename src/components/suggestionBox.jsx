import React from 'react';
import _ from 'lodash';

import MiniCard from 'components/miniCard';

const SuggestionBox = ({searchTerm, filteredEntities}) => {
  var suggestions = [];
  var overCapacity = () => suggestions.length > 8;

  if (searchTerm === '') {
    
  } else {
    suggestions = filteredEntities;

    if (overCapacity()) {
      suggestions = _.filter(suggestions, 'bioguideId');

      suggestions = _.slice(suggestions, 0, 8);
    }
  }

  console.log({suggestions})

  const containerStyles = `
    relative text-nowrap w-full max-w-3xl mt-10
    p-2 bg-white border border-gray-300 rounded-lg
    overflow-auto h-72
    ${suggestions.length > 4 ? 'scrollable' : ''}
  `;

  return (
    <div className={containerStyles}>
      {_.map(suggestions, (suggestion, index) => (
        <MiniCard
          {...{suggestion, delay: index * 150}}
          key={suggestion.fecId1}
        />
      ))}
    </div>
  );
};

export default SuggestionBox;