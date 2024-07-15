import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import Home from '../pages/homePage';
import About from '../pages/aboutPage';
import Contact from '../pages/contactPage';
import NotFound from '../pages/404';
import Layout from './layout';

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;