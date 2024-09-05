import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';

import { requestPoliticianDetails } from '../../redux/actions';

import BioCard from './infoCards/bioCard';
import BillCard from './infoCards/billCard';
import MemProfCard from './infoCards/memProfCard';
import ContribCard from './infoCards/contribCard';
import Loading from 'components/loading';

const cardMap = {
  bio: BioCard,
  sponsoredLegislation: BillCard,
  cosponsoredLegislation: BillCard,
  memProf: MemProfCard,
  candContrib: ContribCard
};

const cardKeys = [
  'bio',
  'candContrib',
  'memProf',
  'sponsoredLegislation',
  'cosponsoredLegislation'
];

const columns = [
  ['bio', 'sponsoredLegislation'],
  ['candContrib', 'memProf', 'cosponsoredLegislation']
];

const cardsFromKeys = ({cardKeys, politician, index}) => {
  return _.map(_.filter(cardKeys, cardKey => cardKey in politician.dataGroups), (cardKey, index2) => {
    var DataCard = cardMap[cardKey];
    var data = politician.dataGroups[cardKey];
    var delay = 200 + index2 * 200 + index * 400;

    return (
      <DataCard
        {...{data, politician, delay, cardKey}}
        key={cardKey}
      />
    );
  })
}

const PoliticianShowPage = () => {
  const dispatch = useDispatch();

  const {id} = useParams();
  const [notFound, setNotFound] = useState(false);
  const {keyedPoliticians} = useSelector(state => state.politicians);

  const politician = _.get(keyedPoliticians, id);

  const memoizedAddPoliticianDetails = useCallback(id => {
    dispatch(requestPoliticianDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (politician) {
      if (!politician.dataGroups) {
        const setPoliticianDetails = async () => {
          memoizedAddPoliticianDetails(id);
        }

        setPoliticianDetails();
      }
    } else if (!_.isEmpty(keyedPoliticians)) {
      setNotFound(true);
    }
  }, [keyedPoliticians, id, politician, memoizedAddPoliticianDetails]);

  setTimeout(() => setNotFound(true), 10000);


  return (
    !_.get(politician, 'dataGroups') ? (
      notFound ? (
        <div>
          <div>Malformed url - please return to the <Link to='/'>homepage</Link> and try a different search</div>
          <div>If you came from the <Link to='/'>homepage</Link> or there is another error, please submit feedback on the <Link to='/contact'>contact page</Link></div>
        </div>
      ) : (
        <Loading/>
      )
    ) : (
      <div className='flex justify-center h-full p-4 bg-gray-100'>
        <div className='flex justify-between gap-4 h-full overflow-y-auto'>
          {_.map(columns, (column, index) => (
            <div className='hidden md:block lg:block w-1/2'>
              {cardsFromKeys({cardKeys: column, politician, index})}
            </div>
          ))}
          <div className='w-full block md:hidden lg:hidden '>
            {cardsFromKeys({cardKeys, politician})}
          </div>
        </div>
        <div className='hidden lg:block fixed right-0 top-16 w-60 p-4 bg-white rounded-lg shadow-md overflow-y-auto max-h-[80vh]'>
          <button className='absolute top-2 right-2 text-xl'>
            x
          </button>
        </div>
      </div>
    )
  );
};

export default PoliticianShowPage;
