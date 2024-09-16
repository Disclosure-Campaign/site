import React from 'react';
import { Routes, Route } from 'react-router-dom';
import _ from 'lodash';

import Home from '../pages/homePage';
import ShowPage from '../pages/showPages/showPage';
import About from '../pages/aboutPage';
import Contact from '../pages/contactPage';
import NotFound from '../pages/404';

const pages = [
  {path: '/', element: <Home/>},
  {path: '/politician/:id', element: <ShowPage entityType='politician'/>},
  {path: '/bill/:congress/:type/:id', element: <ShowPage entityType='bill'/>},
  {path: '/about', element: <About/>},
  {path: '/contact', element: <Contact/>},
  {path: '/*', element: <NotFound/>}
];

const RoutesComponent = () => (
  <Routes>
    {_.map(pages, ({path, element}) => <Route path={path} element={element} key={path}/>)}
  </Routes>
);


export default RoutesComponent;