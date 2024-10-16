import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import _ from 'lodash';

import { Bars3Icon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import logoWhite from 'assets/images/logoWhite.svg';

import Button from 'components/button';

import { copy, styles, menuLinks } from 'global';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  var {pathname, key} = useLocation();
  var showBackButton = pathname !== '/' || key !== 'default';

  const handleBackClick = () => navigate(key === 'default' ? '/' : -1);

  return (
    <header className={`text-white p-4 h-16 relative bg-emerald-600 ${styles.primaryColorBg}`}>
      <div className={`container mx-auto relative`}>
        <Link to='/' className='text-lg font-bold absolute top-0 hover:text-gray-300'>{copy.siteName}</Link>
        <Link to='/' className='max-sm:hidden absolute left-1/2 transform -translate-x-1/2'>
          <img src={logoWhite} alt='Home Logo' className='w-20'/>
        </Link>
        <div className='hidden md:flex space-x-4 text-nowrap font-bold absolute top-1 right-0'>
          {_.map(menuLinks, ({text, url}) =>
            <Link to={'/' + url} key={url} className='font-bold hover:text-gray-300'>{text}</Link>
          )}
        </div>
        <button
          className='md:hidden text-white focus:outline-none absolute right-0'
          onClick={toggleMenu}
        >
          <div className={`h-8 w-8`}>
            <Bars3Icon/>
          </div>
        </button>
      </div>
      {isMenuOpen && (
        <nav className={`md:hidden flex flex-col items-center p-4 space-y-2 mt-2 z-10 absolute right-0 top-14 rounded-bl-md ${styles.primaryColorBg}`}>
          {_.map(menuLinks, ({text, url}) =>
            <Link to={'/' + url} key={url} className='hover:text-gray-300 text-right' onClick={toggleMenu}>{text}</Link>
          )}
        </nav>
      )}
      {showBackButton && <div className={`z-10 absolute top-20 max-sm:hidden`}>
        <Button {...{
          addStyles: `h-20 w-20 text-emerald-600 hover:text-emerald-500`,
          Icon: ArrowLeftCircleIcon,
          onClick: handleBackClick,
        }}/>
      </div>}
    </header>
  );
};

export default Header;
