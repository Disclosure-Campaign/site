import React from 'react';
import _ from 'lodash';

import Card from 'components/card';
import { formatCurrency } from 'helpers';

const FinancialCard = ({entity, dataLoaded, delay, cardKey, infoCallback, focused}) => {
  const financials = entity?.financials?.[2024] || entity?.financials?.[2022];
  const yearLabel = entity?.financials?.[2024] ? '2024' : '2022';

  if (!financials) {
    return (
      <Card {...{ delay, cardKey, infoCallback, focused, dataLoaded: true }}>
        <p>No financial data available</p>
      </Card>
    );
  }

  const section1 = [
    {label: 'Total Receipts', value: financials.receipts},
    {label: 'Total Disbursements', value: financials.disbursements},
    {label: 'Cash on Hand', value: financials.last_cash_on_hand_end_period},
    {label: 'Net Contributions', value: financials.net_contributions}
  ];

  const section2 = [
    {label: 'Individual (Itemized)', value: financials.individual_itemized_contributions},
    {label: 'Individual (Unitemized)', value: financials.individual_unitemized_contributions},
    {label: 'Committee Contributions', value: financials.other_political_committee_contributions},
    {label: 'Candidate Contribution', value: financials.candidate_contribution}
  ];

  return (
    <Card {...{ delay, cardKey, infoCallback, focused, dataLoaded: true }}>
      <div>
        <p className='text-gray-700 mb-2 font-bold'>Campaign Finances</p>
        <table className='w-full border-collapse border-spacing-0 mb-4'>
          <tbody>
            {_.map(section1, ({label, value}, index) => (
              <tr key={index} className='border-b border-gray-100'>
                <td className='text-left p-1'>{label}</td>
                <td className='text-right p-1 text-gray-700'>{formatCurrency(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className='text-gray-700 mb-2 font-bold'>Contribution Breakdown</p>
        <table className='w-full border-collapse border-spacing-0'>
          <tbody>
            {_.map(section2, ({label, value}, index) => (
              <tr key={index} className='border-b border-gray-100'>
                <td className='text-left p-1'>{label}</td>
                <td className='text-right p-1 text-gray-700'>{formatCurrency(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {financials.coverage_start_date && (
          <div className='mt-2 text-sm text-gray-500'>
            <p>Reporting Period: {new Date(financials.coverage_start_date).toLocaleDateString()} - {new Date(financials.coverage_end_date).toLocaleDateString()}</p>
            <p>Report Type: {financials.last_report_type_full}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FinancialCard;