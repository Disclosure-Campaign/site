import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './redux/reducers';
import Home from './pages/home/Home';
import Results from './pages/results/Results';
import Header from './components/Header';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;