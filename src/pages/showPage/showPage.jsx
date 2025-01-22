import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';

import { XCircleIcon } from '@heroicons/react/24/outline';

import api from 'api';

import BioCard from './politicianCards/bioCard';
import PresidentialCard from './politicianCards/presidentialCard';
import BillCard from './politicianCards/billCard';
import MemProfCard from './politicianCards/memProfCard';
import ContribCard from './politicianCards/contribCard';
import LinksCard from './politicianCards/linksCard';

import BillInfoCard from './billCards/billInfoCard';
import SummariesCard from './billCards/summariesCard';
import SponsorsCard from './billCards/sponsorsCard';

import OrgCard from './orgCards/orgCard';
import BreakdownCard from './orgCards/breakdownCard';

import InfoPanel from 'components/infoPanel';

import { requestMultipleDataGroups } from 'helpers';
import { keyIdMap } from 'global';

const cardMaps = {
  politician: {
    bio: BioCard,
    presidential: PresidentialCard,
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
  },
  org: {
    org: OrgCard,
    breakdown: BreakdownCard
  }
};

const cardKeyMap = {
  politician: [
    'bio',
    'presidential',
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
  ],
  org: [
    'org',
    'breakdown'
  ]
};

const columnMaps = {
  politician: [
    ['bio', 'presidential', 'sponsoredLegislation'],
    ['candContrib', 'memProf', 'links', 'cosponsoredLegislation']
  ],
  bill: [
    ['bill', 'sponsors'],
    ['summaries']
  ],
  org: [
    ['org'],
    ['breakdown']
  ]
};

const shouldShowCard = ({entity, cardKey: key}) => (
  (entity[key] !== 'unavailable' || key === 'bio') && (
    (entity.type !== 'politician') || entity[keyIdMap[entity.type][key]] ||
    (key === 'presidential' && _.includes(['P00009423', 'P80001571', 'P80000722'], entity.fecId1))
  )
);

const ShowPage = ({entityType}) => {
  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);
  const [infoParams, setInfoParams] = useState({});

  // politician
  const { id, congress, type, orgSlug } = useParams();
  const { keyedPoliticians } = useSelector(state => state.politicians);
  const politician = _.get(keyedPoliticians, id);

  // bill
  const [bill, setBill] = useState({});

  // org
  const [org, setOrg] = useState({});

  const cardMap = cardMaps[entityType];
  const cardKeys = cardKeyMap[entityType];
  const columns = columnMaps[entityType];

  const memoizedAddPoliticianDetails = useCallback(() => {
    requestMultipleDataGroups({dispatch, politician, groups: 'all'});
  }, [dispatch]);

  const memoizedRequestBillData = useCallback(async () => {
    return await api.requestData({
      route: 'request_standard_data',
      entity_type: 'bill',
      congress, type, id
    });
  }, [congress, type, id]);

  const memoizedRequestOrgData = useCallback(async () => {
    return await api.requestData({
      route: 'request_standard_data',
      entity_type: 'org',
      org_slug: orgSlug
    });
  }, [orgSlug]);

  useEffect(() => {
    if (entityType === 'politician') {
      try {
        memoizedAddPoliticianDetails(id);
      }
      catch(error) {
        // setTimeout(() => setNotFound(true), 500);
      }
    } else if (entityType === 'bill') {
      const requestBillData = async () => {
        try {
          const bill = await memoizedRequestBillData();

          setBill(bill);
        }
        catch (error) {
          // setTimeout(() => setNotFound(true), 500);
        }
      }

      requestBillData();
    } else if (entityType === 'org') {
      const requestOrgData = async () => {
        try {
          const org = await memoizedRequestOrgData();

          setOrg(org);
        }
        catch (error) {
          // setTimeout(() => setNotFound(true), 500);
        }
      }

      requestOrgData();
    }
  }, [
      id, congress, type, orgSlug,
      memoizedAddPoliticianDetails,
      memoizedRequestBillData,
      memoizedRequestOrgData
  ]);

  const handleInfoParams = params => {
    setInfoParams(infoParams.cardKey === params.cardKey ? {} : params);
  }

  const cardsFromKeys = ({cardKeys, entity, infoCallback, index}) => (
    _.map(_.filter(cardKeys, cardKey => shouldShowCard({cardKey, entity})), (cardKey, index2) => {
      var DataCard = cardMap[cardKey];
      var delay = 200 + index2 * 200 + index * 400;

      return (
        <DataCard
          {...{
            focused: infoParams.cardKey === cardKey,
            entity, delay, cardKey, infoCallback
          }}
          key={cardKey}
        />
      );
    })
  );

  var entity;

  if (entityType === 'politician') {
    entity = politician;
  } else if (entityType === 'bill') {
    entity = bill;
  } else if (entityType === 'org') {
    entity = org;
  }

  entity = entity || {};

  return (
    notFound ? (
      <div className='flex flex-col justify-center items-center h-screen'>
        <div>Internet connection issue or malformed url.</div>
        <div>If you came from the <Link to='/' className='text-blue-500'>homepage</Link> or there is another error, please submit feedback on the <Link to='/contact' className='text-blue-500'>contact page</Link>.</div>
      </div>
    ) : (
      <div className='flex justify-center h-full p-4 pr-0 bg-gray-100'>
        <div className='flex justify-between gap-4 h-full overflow-y-auto'>
          {_.map(columns, (column, index) => (
            <div key={index} className='hidden md:block lg:block w-1/2'>
              {cardsFromKeys({cardKeys: column, entity, infoCallback: handleInfoParams, index})}
            </div>
          ))}
          <div className='w-full block md:hidden lg:hidden '>
            {cardsFromKeys({cardKeys, entity, infoCallback: handleInfoParams})}
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
