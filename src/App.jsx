import React, { useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from 'api';
import { addPoliticians } from './redux/actions';

import RoutesComponent from './components/routes';
import Header from './components/header';

const App = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  const memoizedAddPoliticians = useCallback(data => {
    dispatch(addPoliticians(data));
  }, [dispatch]);

  useEffect(() => {
    if (hasFetched.current) {
      const setEntities = async () => {
        const {keyedPoliticians, sortedPoliticians} = await api.requestSearchableEntities({});

        console.log({keyedPoliticians, sortedPoliticians})

        memoizedAddPoliticians({keyedPoliticians, sortedPoliticians});
      }

      setEntities()
    } else {
      hasFetched.current = true;
    }
  }, [memoizedAddPoliticians]);

  return (
    <Router>
      <div className='App'>
        <Header/>
        <main className='container mx-auto p-4'>
          <RoutesComponent/>
        </main>
      </div>
    </Router>
  );
}

export default App;