import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import config from 'config';

const menuLinks = [
  {name: 'About', key: 'about'},
  {name: 'Contact', key: 'contact'}
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={config.styles.primaryColor + "text-white p-4"}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to='/' className="text-lg font-bold">{config.siteName}</Link>
        <nav className="hidden md:flex space-x-4">
          {_.map(menuLinks, ({name, key}) =>
            <Link to={'/' + key} className="hover:text-gray-300">{name}</Link>
          )}
        </nav>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col space-y-2 mt-2">
          {_.map(menuLinks, ({name, key}) =>
            <Link to={'/' + key} className="hover:text-gray-300" onClick={toggleMenu}>{name}</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
