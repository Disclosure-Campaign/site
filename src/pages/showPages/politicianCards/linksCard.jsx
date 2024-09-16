import React from 'react';
import _ from 'lodash';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import Card from 'components/card';

const nameToSlug = name => name.toLowerCase().replace(/\s+/g, '-');

const LinksCard = ({entity: politician, delay, cardKey, infoCallback}) => {
  const {
    fullName, bioguideId, opensecretsId,
    website, twitter, contactForm
  } = politician.dataGroups['bio'];

  const props = {delay, cardKey, infoCallback};

  const slug = nameToSlug(fullName);

  const links = [
    {
      flag: bioguideId,
      url: `https://www.congress.gov/member/${slug}/${bioguideId}`,
      text: `Page for ${fullName} on Congress.gov`
    },
    {
      flag: opensecretsId,
      url: `https://www.opensecrets.org/members-of-congress/${slug}/summary?cid=${opensecretsId}`,
      text: `Page for ${fullName} on OpenSecrets`
    },
    {
      flag: website,
      url: `${website}`,
      text: `${fullName}'s website`
    },
    {
      flag: contactForm,
      url: `${contactForm}`,
      text: `${fullName}'s contact form`
    },
    {
      flag: twitter,
      url: `https://x.com/${twitter}`,
      text: `${fullName}'s twitter page`
    },
  ];

  return (
    <Card {...props}>
      <p className='mb-4'><strong>External Links:</strong></p>
      {_.map(_.filter(links, 'flag'), ({text, url}, index) => (
        <div key={index} className='flex flex-row'>
          <p className='mb-2 border-b'>{text}</p>
          <a
            className='ml-2 py-1 h-4 w-4 rounded-full text-blue-500'
            rel='noopener noreferrer'
            target='_blank'
            href={url}
          >
            <ArrowTopRightOnSquareIcon />
          </a>
        </div>
      ))}

    </Card>
  );
}

export default LinksCard;

// var ex = {
//   "bioguideId": "R000614",
//   "birthday": "Mon, 07 Aug 1972 00:00:00 GMT",
//   "candidateCity": "AUSTIN",
//   "candidateElectionYear": 2024,
//   "candidateIncumbent": "I",
//   "candidateOffice": "H",
//   "candidateOfficeDistrict": "21",
//   "candidateOfficeState": "TX",
//   "candidateState": "TX",
//   "candidateStatus": "C",
//   "candidateStreet1": "6705 W. HWY 290",
//   "candidateStreet2": "SUITE 50295",
//   "candidateZip": 78735,
//   "contactForm": "",
//   "currentTitle": "Representative from Texas",
//   "depictionAttribution": "Image courtesy of the Member",
//   "depictionImageUrl": "https://www.congress.gov/img/member/r000614_200.jpg",
//   "district": 21,
//   "facebook": "",
//   "fecId1": "H8TX21307",
//   "fecId2": null,
//   "fecId3": null,
//   "firstName": "Chip",
//   "fullName": "Chip Roy",
//   "lastName": "Roy",
//   "lastUpdated": "Fri, 06 Sep 2024 15:36:27 GMT",
//   "middleName": "",
//   "opensecretsId": "N00042268",
//   "party": "Republican Party",
//   "phone": "202-225-4236",
//   "runningFor": null,
//   "state": "TX",
//   "twitter": "RepChipRoy",
//   "type": "rep",
//   "website": "https://roy.house.gov"
// }