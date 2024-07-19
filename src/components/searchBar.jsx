import { useState } from 'react';
import _ from 'lodash';

import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

import Button from './button';
import { styles } from 'global';

const filterOptions = [
  {filterKey: 'operator', element: 'select', preset: 'and', options: [
    {value: 'and', label: 'And'},
    {value: 'or', label: 'Or'}
  ]},
  {filterKey: 'type', element: 'select', preset: 'politician', options: [
    {value: 'politician', label: 'Politician'},
    {value: 'organization', label: 'Organization'}
  ]},
  {filterKey: 'rela', element: 'select', preset: 'is', options: [
    {value: 'is', label: 'Is'},
    {value: 'is_not', label: 'Is not'}
  ]},
  {filterKey: 'value', element: 'input', preset: ''}
];

const presets = _.reduce(filterOptions, (result, {filterKey, preset}) => {
  result[filterKey] = preset;

  return result;
}, {});

const createNewFilter = () => ({...presets, id: _.uniqueId('filter_')});

const SearchBar = ({entities, search}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [selectedOption, setSelectedOption] = useState({});
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [newFilter, setNewFilter] = useState(createNewFilter());
  const [filters, setFilters] = useState({});

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => search({filters, searchType});

  const handleNewFilterChange = ({filterKey, value}) => {
    setNewFilter({...newFilter, [filterKey]: value});
  };

  const addFilter = () => {
    setFilters({...filters, [newFilter.id]: newFilter});
    setNewFilter(createNewFilter());
  };

  const removeFilter = id => setFilters(_.omit(filters, id));

  const toggleSearchMode = () => setIsAdvanced(!isAdvanced);

  var filteredEntities =
    searchTerm === ''
      ? entities
      : _.filter(entities, ({label}) =>
          _.includes(label.toLowerCase(), searchTerm.toLowerCase())
        );

  return (
    <div className="relative flex flex-col items-center border rounded-md p-4 space-y-4 w-full max-w-3xl mx-auto">
      <div className="flex items-center w-full border rounded-md">
        <Combobox value={_.get(selectedOption, 'label', '')} onChange={setSelectedOption}>
          <ComboboxInput
            onChange={handleSearchChange}
            className="p-2 w-full focus:outline-none"
            placeholder="Search for a politician or organization..."
          />
          <ComboboxOptions anchor="bottom start" className="bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {_.map(filteredEntities, entity => (
              <ComboboxOption key={entity.key} value={entity}>
                {({focused}) => (
                  <div
                    className={`cursor-pointer select-none p-2 ${
                      focused ? 'bg-blue-500 text-white' : 'text-gray-900'
                    }`}
                  >
                    {entity.label}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
        <Button {...{
          Icon: MagnifyingGlassCircleIcon,
          disabled: _.isEmpty(selectedOption),
          onClick: handleSearch,
          aria: 'search'
        }}/>
      </div>
      {isAdvanced && (
        <div className="flex space-x-2 mb-4">
          <div className="flex items-center mt-4">
            {_.map(filterOptions, ({element, filterKey, options, placeholder}) => (
              element === 'select' ? (
                <select
                  key={filterKey}
                  value={newFilter[filterKey]}
                  className="p-2 border border-gray-300 rounded mr-2"
                  onChange={(e) => handleNewFilterChange({filterKey, value: e.target.value})}
                >
                  {_.map(options, ({value, label}) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
               ) : (
                <input
                  key={filterKey}
                  type='text'
                  value={newFilter[filterKey]}
                  placeholder={placeholder}
                  className="p-2 border border-gray-300 rounded mr-2"
                  onChange={(e) => handleNewFilterChange({filterKey, value: e.target.value})}
                />
              )
            ))}
            <Button onClick={key => addFilter(key)} text={'Add Filter'}/>
          </div>
          <div className="flex flex-wrap space-between space-x-2">
            {_.map(filters, ({operator, type, rela, value}, key) => (
              <div
                key={key}
                className="bg-blue-200 text-blue-700 px-4 py-2 rounded-full flex items-center space-x-2"
              >
                <span>{`${operator} ${type} ${rela} ${value}`}</span>
                <button
                  onClick={() => removeFilter(key)}
                  className="text-blue-500 hover:text-blue-800 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4">
        <Button
          onClick={toggleSearchMode}
          text={isAdvanced ? 'Standard' : 'Advanced'}
        />
      </div>
    </div>
  );
};

export default SearchBar;