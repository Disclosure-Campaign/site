import React, { useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from 'api';
import { addPoliticians, addZips } from './redux/actions';

import RoutesComponent from './components/routes';
import Header from './components/header';

const App = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  const memoizedAddPoliticians = useCallback(data => {
    dispatch(addPoliticians(data));
  }, [dispatch]);

  const memoizedAddZips = useCallback(data => {
    dispatch(addZips(data));
  }, [dispatch]);

  useEffect(() => {
    if (hasFetched.current) {
      const setEntities = async () => {
        const {
          keyedPoliticians, sortedPoliticians,
          zipList, keyedZips
        } = await api.requestData({
          route: 'request_searchable_entities'
        });

        memoizedAddPoliticians({keyedPoliticians, sortedPoliticians});
        memoizedAddZips({zipList, keyedZips});
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
        <main className='w-screen h-[92vh]'>
          <RoutesComponent/>
        </main>
      </div>
    </Router>
  );
}

export default App;