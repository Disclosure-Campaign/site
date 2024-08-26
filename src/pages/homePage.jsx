import React from 'react';
import _ from 'lodash';

import { copy, styles } from 'global';
import SearchBar from 'components/searchBar';

const Home = () => {


  return (
    <div className={`min-h-screen flex flex-col items-center bg-gray-100 ${styles.border} p-4`}>
      <main className="flex flex-col items-center w-full mt-8 md:mt-16">
        <h1 className="text-2xl font-bold mb-16">{copy.introText}</h1>
        <SearchBar/>
      </main>
    </div>
  );
};

export default Home;