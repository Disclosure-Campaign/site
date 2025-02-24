import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import api from 'api';
import { addPoliticians, addZips } from './redux/actions';

import RoutesComponent from './components/routes';
import Header from './components/header';
import Footer from './components/footer';
import Loading from 'components/loading';

const App = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const [error, setError] = useState(false);
  const { keyedPoliticians } = useSelector(state => state.politicians);

  const memoizedAddPoliticians = useCallback(data => {
    dispatch(addPoliticians(data));
  }, [dispatch]);

  const memoizedAddZips = useCallback(data => {
    dispatch(addZips(data));
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched.current && _.isEmpty(keyedPoliticians)) {
      const setEntities = async () => {
        const result = await api.requestData({route: 'request_searchable_entities'});

        if (result) {
          const {
            keyedPoliticians, sortedPoliticians,
            keyedZips, zipList
          } = result;

          memoizedAddPoliticians({keyedPoliticians, sortedPoliticians});
          memoizedAddZips({keyedZips, zipList});
        } else {
          setError(true);
        }
      }

      setEntities()
    } else {
      hasFetched.current = true;
    }
  }, [memoizedAddPoliticians, memoizedAddZips]);

  return (
    <Router>
      <div className='w-screen h-screen'>
        <Header/>
        <main className='w-screen h-[88vh] bg-gray-100'>
          {!_.isEmpty(keyedPoliticians) ? (
            <RoutesComponent error={error}/>
          ) : (
            <Loading/>
          )}
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;