import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { requestPoliticianDetails } from '../../redux/actions';

import Card from 'components/card';
import Loading from 'components/loading';

const PoliticianShowPage = () => {
  const dispatch = useDispatch();

  const { id, filters } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(true);
  const { keyedPoliticians } = useSelector(state => state.politicians);

  const memoizedAddPoliticianDetails = useCallback(id => {
    dispatch(requestPoliticianDetails(id));
  }, [dispatch]);

  useEffect(() => {
    var politician = _.get(keyedPoliticians, id);

    if (politician) {
      if (!politician.dataGroups) {
        const setPoliticianDetails = async () => {
          memoizedAddPoliticianDetails(id);
        }

        setPoliticianDetails();
        setNotFound(false);
      }
    } else if (!_.isEmpty(keyedPoliticians)) {
      setNotFound(true);
    }

    setLoading(false);
  }, [keyedPoliticians, id, memoizedAddPoliticianDetails]);

  return (
    loading ? (
      <Loading/>
    ) : (
      notFound ? (
        <div>
          <div>Malformed url - please return to the <Link to='/'>homepage</Link> and try a different search</div>
          <div>If you came from the <Link to='/'>homepage</Link> or there is another error, please submit feedback on the <Link to='/contact'>contact page</Link></div>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* {_.map(dataGroups, (item, index) => (
            <Card key={index} item={item} />
          ))} */}
        </div>
      )
    )
  );
};

export default PoliticianShowPage;
