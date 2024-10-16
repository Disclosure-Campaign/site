import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { menuLinks } from 'global';

const Footer = () => (
  <footer className={`w-full text-center h-8 bg-gray-100 max-sm:hidden`}>
    <nav className='flex justify-center space-x-6'>
      {_.map(menuLinks, ({url, text}) => (
        <Link to={url} key={url} className='text-gray-400 hover:text-gray-600'>
          {text}
        </Link>
      ))}
    </nav>
  </footer>
);

export default Footer;
