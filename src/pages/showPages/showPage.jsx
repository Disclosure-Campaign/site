import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';

import { XCircleIcon } from '@heroicons/react/24/outline';

import api from 'api';
import { requestPoliticianDetails } from '../../redux/actions';

import BioCard from './politicianCards/bioCard';
import BillCard from './politicianCards/billCard';
import MemProfCard from './politicianCards/memProfCard';
import ContribCard from './politicianCards/contribCard';
import LinksCard from './politicianCards/linksCard';

import BillInfoCard from './billCards/billInfoCard';
import SummariesCard from './billCards/summariesCard';
import SponsorsCard from './billCards/sponsorsCard';

import InfoPanel from 'components/infoPanel';
import Loading from 'components/loading';

// import { styles } from 'global';

const cardMaps = {
  politician: {
    bio: BioCard,
    sponsoredLegislation: BillCard,
    cosponsoredLegislation: BillCard,
    memProf: MemProfCard,
    candContrib: ContribCard,
    links: LinksCard
  },
  bill: {
    bill: BillInfoCard,
    summaries: SummariesCard,
    sponsors: SponsorsCard
  }
};

const cardKeyMap = {
  politician: [
    'bio',
    'candContrib',
    'memProf',
    'links',
    'sponsoredLegislation',
    'cosponsoredLegislation'
  ],
  bill: [
    'bill',
    'summaries',
    'sponsors'
  ]
};

const columnMaps = {
  politician: [
    ['bio', 'sponsoredLegislation'],
    ['candContrib', 'memProf', 'links', 'cosponsoredLegislation']
  ],
  bill: [
    ['bill', 'sponsors'],
    ['summaries']
  ]
};

const getDataKey = key => {
  var dataKey = {links: 'bio', sponsors: 'bill'}[key];

  return dataKey || key;
}

const ShowPage = ({entityType}) => {
  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);
  const [infoParams, setInfoParams] = useState({});

  // politician
  const {id, congress, type} = useParams();
  const {keyedPoliticians} = useSelector(state => state.politicians);
  const politician = _.get(keyedPoliticians, id);

  // bill
  const [bill, setBill] = useState({});

  const cardMap = cardMaps[entityType];
  const cardKeys = cardKeyMap[entityType];
  const columns = columnMaps[entityType];

  const memoizedAddPoliticianDetails = useCallback(id => {
    dispatch(requestPoliticianDetails(id));
  }, [dispatch]);

  const memoizedRequestBillData = useCallback(async () => {
    return await api.requestData({
      route: 'request_bill_data',
      congress, type, id
    });
  }, [congress, type, id]);

  useEffect(() => {
    if (entityType === 'politician') {
      if (politician) {
        if (!politician.dataGroups) {
          const setPoliticianDetails = () => {
            memoizedAddPoliticianDetails(id);
          }

          setPoliticianDetails();
        }
      } else if (!_.isEmpty(keyedPoliticians)) {
        setNotFound(true);
      }
    }
  }, [keyedPoliticians, id, politician, memoizedAddPoliticianDetails]);

  useEffect(() => {
    if (entityType === 'bill') {
        const requestBillData = async () => {
          const bill = await memoizedRequestBillData();

          setBill({dataGroups: bill});
        }

        requestBillData();
    }
  }, [memoizedRequestBillData]);

  setTimeout(() => setNotFound(true), 10000);

  const cardsFromKeys = ({cardKeys, entity, infoCallback, index}) => {
    return _.map(_.filter(cardKeys, cardKey => getDataKey(cardKey) in entity.dataGroups), (cardKey, index2) => {
      var DataCard = cardMap[cardKey];
      var delay = 200 + index2 * 200 + index * 400;

      return (
        <DataCard
          {...{entity, delay, cardKey, infoCallback}}
          key={cardKey}
        />
      );
    });
  }

  var entity;

  if (entityType === 'politician') {
    entity = politician;
  } else if (entityType === 'bill') {
    entity = bill;
  }

  return (
    !_.get(entity, 'dataGroups') ? (
      notFound ? (
        <div>
          <div>Malformed url - please return to the <Link to='/'>homepage</Link> and try a different search</div>
          <div>If you came from the <Link to='/'>homepage</Link> or there is another error, please submit feedback on the <Link to='/contact'>contact page</Link></div>
        </div>
      ) : (
        <Loading/>
      )
    ) : (
      <div className='flex justify-center h-full p-4 pr-0 bg-gray-100'>
        <div className='flex justify-between gap-4 h-full overflow-y-auto'>
          {_.map(columns, (column, index) => (
            <div key={index} className='hidden md:block lg:block w-1/2'>
              {cardsFromKeys({cardKeys: column, entity, infoCallback: setInfoParams, index})}
            </div>
          ))}
          <div className='w-full block md:hidden lg:hidden '>
            {cardsFromKeys({cardKeys, entity, infoCallback: setInfoParams})}
          </div>
        </div>
        {!_.isEmpty(infoParams) && (
          <div className='hidden lg:block fixed right-4 top-20 w-60 p-4 bg-white rounded-lg shadow-md overflow-y-auto'>
            <div
              className={`absolute top-2 right-2 h-5 w-5 cursor-pointer`}
              onClick={() => setInfoParams({})}
            >
              <XCircleIcon/>
            </div>
            <InfoPanel {...{entity, ...infoParams}}/>
          </div>
        )}
      </div>
    )
  );
};

export default ShowPage;
