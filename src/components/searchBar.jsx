import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import _ from 'lodash';

import { FixedSizeList } from 'react-window';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

import { requestPoliticianDetails } from '../redux/actions';

import Button from './button';
// import { styles } from 'global';

const idMap = {
  'politician': 'fecId1'
}

const filterOptions = [
  {filterKey: 'operator', element: 'select', preset: 'and', options: [
    {value: 'and', fullName: 'And'},
    {value: 'or', fullName: 'Or'}
  ]},
  {filterKey: 'type', element: 'select', preset: 'politician', options: [
    {value: 'politician', fullName: 'Politician'},
    {value: 'organization', fullName: 'Organization'}
  ]},
  {filterKey: 'rela', element: 'select', preset: 'is', options: [
    {value: 'is', fullName: 'Is'},
    {value: 'is_not', fullName: 'Is not'}
  ]},
  {filterKey: 'value', element: 'input', preset: ''}
];

const presets = _.reduce(filterOptions, (result, {filterKey, preset}) => _.set(result, filterKey, preset), {});

const createNewFilter = () => ({...presets, id: _.uniqueId('filter_')});

const SearchBar = ({searchTerm, handleSearchChange, filteredEntities}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState({});
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [newFilter, setNewFilter] = useState(createNewFilter());
  const [filters, setFilters] = useState({});

  const search = () => {
    var { type: searchType } = selectedOption;

    var id = selectedOption[idMap[searchType]];

    if (searchType === 'politician') {
      dispatch(requestPoliticianDetails({
        politicianIds: [id],
        onlyBio: false
      }));
    }

    var filterString = _.isEmpty(filters) ? '' : _.trimEnd(
      _.reduce(filters, (result, {operator, rela, type,  value}) => (
        result += `${operator}-${rela}-${type}-${value}_`
      ), '&'),
    '_');

    navigate(`/${searchType}/${id}${filterString}`);
  };

  const handleNewFilterChange = ({filterKey, value}) => {
    setNewFilter({...newFilter, [filterKey]: value});
  };

  const addFilter = () => {
    setFilters({...filters, [newFilter.id]: newFilter});
    setNewFilter(createNewFilter());
  };

  const removeFilter = id => setFilters(_.omit(filters, id));

  // const toggleSearchMode = () => setIsAdvanced(!isAdvanced);

  const handleInputChange = option => {
    if (!_.isEmpty(option)) {
      handleSearchChange(option.fullName);
      setSelectedOption(option);
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !_.isEmpty(selectedOption)) {
      search();
    }
  };

  const SearchOption = ({index, style}) => {
    var entity = filteredEntities[index];

    return (
      <ComboboxOption
        className={({focused}) => `cursor-pointer select-none relative py-2 pl-4 pr-4 ${
          focused ? 'bg-blue-600 text-white' : 'text-gray-900'
        }`}
        key={entity.id}
        value={entity}
        style={style}
      >
        {({focused}) => (
          <div
            className={`cursor-pointer select-none p-2 ${
              focused ? 'bg-blue-500 text-white' : 'text-gray-900'
            }`}
          >
            {entity.fullName}
          </div>
        )}
      </ComboboxOption>
    )
  };

  return (
    <div className='relative flex flex-col items-center border rounded-md p-4 space-y-4 w-full max-w-3xl mx-auto'>
      <div className='font-bold'>
        Start typing a politician's name or a zipcode, then select an option from the dropdown or tray.
      </div>
      <div className='flex items-center w-full border rounded-md'>
        <Combobox value={searchTerm} onChange={handleInputChange}>
          <ComboboxInput
            placeholder={`Enter politician's name or zipcode...`}
            onChange={e => handleSearchChange(e.target.value)}
            className='p-2 w-full focus:outline-none'
            onKeyDown={handleKeyDown}
          />
          <ComboboxOptions anchor='bottom start' className='bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none'>
            {(filteredEntities.length === 0 && searchTerm !== '') ? (
              <div className='cursor-default select-none relative py-2 pl-4 pr-4 text-gray-700'>
                No results...
              </div>
            ) : (
              <FixedSizeList
                height={_.min([filteredEntities.length * 35, 5 * 35])}
                itemCount={filteredEntities.length}
                className='w-full'
                itemSize={35}
                width={300}
              >
                {SearchOption}
              </FixedSizeList>
            )}
          </ComboboxOptions>
        </Combobox>
        <Button {...{
          disabled: _.isEmpty(selectedOption),
          Icon: MagnifyingGlassCircleIcon,
          onClick: search,
          aria: 'search'
        }}/>
      </div>
      {isAdvanced && (
        <div className='flex space-x-2 mb-4'>
          <div className='flex items-center mt-4'>
            {_.map(filterOptions, ({element, filterKey, options, placeholder}) => (
              element === 'select' ? (
                <select
                  onChange={e => handleNewFilterChange({filterKey, value: e.target.value})}
                  className='p-2 border border-gray-300 rounded mr-2'
                  value={newFilter[filterKey]}
                  key={filterKey}
                >
                  {_.map(options, ({value, fullName}) => (
                    <option key={value} value={value}>{fullName}</option>
                  ))}
                </select>
               ) : (
                <input
                  onChange={e => handleNewFilterChange({filterKey, value: e.target.value})}
                  className='p-2 border border-gray-300 rounded mr-2'
                  value={newFilter[filterKey]}
                  placeholder={placeholder}
                  key={filterKey}
                  type='text'
                />
              )
            ))}
            <Button onClick={key => addFilter(key)} text={'Add Filter'}/>
          </div>
          <div className='flex flex-wrap space-between space-x-2'>
            {_.map(filters, ({operator, type, rela, value}, key) => (
              <div
                className='bg-blue-200 text-blue-700 px-4 py-2 rounded-full flex items-center space-x-2'
                key={key}
              >
                <span>{`${operator} ${type} ${rela} ${value}`}</span>
                <button
                  className='text-blue-500 hover:text-blue-800 focus:outline-none'
                  onClick={() => removeFilter(key)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <div className='mt-4'>
        <Button
          text={isAdvanced ? 'Standard' : 'Advanced'}
          onClick={toggleSearchMode}
        />
      </div> */}
    </div>
  );
};

export default SearchBar;