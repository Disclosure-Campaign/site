import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { SelectorIcon, XIcon } from '@heroicons/react/solid';
import _ from 'lodash';

import { copy, styles } from 'global';
import SearchBar from 'components/searchBar';

const entities = [
  {label: 'Cori Bush', key: 'cori_bush'},
  {label: 'Charles Schumer', key: 'chuck_schumer'}
];

const Home = () => {
  const navigate = useNavigate();

  const search = ({filters, searchType}) => {
    // var filterString = _.reduce(filters, (result, {operator, rela, type,  value}) => (
    //   result += `filters=${operator}-${rela}-${type}-${value}`
    // ), '');

    // navigate(`/results?type=${searchType}${filterString}`);

    console.log({filters, searchType})
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <main className="flex flex-col items-center w-full mt-8 md:mt-16">
        <h1 className="text-2xl font-bold mb-16">{copy.introText}</h1>
        <SearchBar {...{entities, search}}/>
      </main>
    </div>
  );
};

export default Home;