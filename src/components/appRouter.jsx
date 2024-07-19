import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import _ from 'lodash';

import Home from '../pages/homePage';
import About from '../pages/aboutPage';
import Contact from '../pages/contactPage';
import NotFound from '../pages/404';
import Layout from './layout';

const pages = [
  {path: '/', element: <Home/>},
  {path: '/about', element: <About/>},
  {path: '/contact', element: <Contact/>},
  {path: '/*', element: <NotFound/>}
]

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {_.map(pages, ({path, element}) => <Route path={path} element={element} key={path}/>)}
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;