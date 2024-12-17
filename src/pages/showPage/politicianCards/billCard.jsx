import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import Card from 'components/card';

import { extractBillVars } from 'helpers';
import { styles } from 'global';

const BillCard = ({entity: politician, delay, cardKey, infoCallback, focused}) => {
  const [displayCount, setDisplayCount] = useState(5);
  // const [sortOrder, setSortOrder] = useState('desc');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { fullName } = politician;

  const label = {
    'sponsoredLegislation': 'Legislation sponsored',
    'cosponsoredLegislation': 'Legislation co-sponsored'
  }[cardKey];

  const bills = _.get(politician, cardKey, []);

  const processedBills = useMemo(
    () => _.map(bills, bill => ({...bill, dateObject: new Date(bill['date:'])})),
    [bills]
  );

  const subjects = useMemo(
    () => [...new Set(_.map([...bills, {'subject': 'Other'}], bill => bill.subject).filter(Boolean))],
    [bills]
  );

  const filteredBills = useMemo(() => {
    let filtered = processedBills;

    if (selectedSubject) {
      if (selectedSubject === 'Other') {
        filtered = filtered.filter(bill => !bill.subject);
      } else {
        filtered = filtered.filter(bill => bill.subject === selectedSubject);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(bill =>
        bill.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // filtered = filtered.sort((a, b) =>
    //   sortOrder === 'asc'
    //     ? a.dateObject - b.dateObject
    //     : b.dateObject - a.dateObject
    // );

    return filtered;
  }, [processedBills, selectedSubject, searchTerm]);

  const visibleBills = filteredBills.slice(0, displayCount);

  return (
    <Card {...{delay, cardKey, infoCallback, focused, dataLoaded: !_.isEmpty(bills)}}>
      <p className='text-gray-700 mb-2 font-bold'>{label} by {fullName}:</p>
      {_.isEmpty(bills) ? (
        <p className='text-gray-700 mb-2'>
          No {label.toLowerCase()} by {fullName}
        </p>
      ) : (
        <div>
          <div className='gap-4 mb-4'>
            {/* <button
              className='px-4 py-2 bg-blue-500 text-white rounded'
              onClick={() => setSortOrder(!sortOrder)}
            >
              Sort by Date: {sortOrder === 'asc' ? 'Most Rece' : 'Descending'}
            </button> */}
            <select
              onChange={e => setSelectedSubject(e.target.value)}
              className='border rounded w-full h-8'
              value={selectedSubject}
            >
              <option value=''>All</option>
              {_.map(subjects, (subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
            <input
              onChange={e => setSearchTerm(e.target.value)}
              className='border p-1 rounded w-full h-8'
              placeholder='Search by Title'
              value={searchTerm}
              type='text'
            />
          </div>
          {_.isEmpty(visibleBills) ? (
            <p className='text-gray-700 mb-2 font-bold'>No legislation matches these filters.</p>
          ) : (
            <div>
              {_.map(visibleBills, ({title, dateObject, subject, url}, index) => {
                var {congress, type, id} = extractBillVars(url);

                return (
                  <div key={index} className='p-4 border-b'>
                    <h4 className='font-bold'>{title}</h4>
                    <p>Date: {dateObject.toLocaleDateString()}</p>
                    <p>Subject: {subject || 'Other'}</p>
                    <Link to={`/bill/${congress}/${type}/${id}`} className='flex flex-row text-blue-500'>
                      View Bill
                      {/* <div className='ml-2 py-1 h-4 w-4 rounded-full'>
                        <ArrowTopRightOnSquareIcon />
                      </div> */}
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
          {visibleBills.length < filteredBills.length && (
            <div
              onClick={() => setDisplayCount(displayCount + 5)}
              className={styles.clickable}
            >
              Show More
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default BillCard;