import React from 'react';

import { copy, cardSourceMap } from 'global';

const cardIntros = {
  bio: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  ),
  candContrib: ({entity, dataSource}) => (
    `A list of the organizations which have spent the most money supporting ${entity.fullName}. From ${dataSource.name}.`
  ),
  memProf: ({entity, dataSource}) => (
    `Information from ${dataSource.name} about some assets owned by ${entity.fullName}. Not necessarily complete.`
  ),
  sponsoredLegislation: ({entity, dataSource}) => (
    `Searchable list of bills sponsored by ${entity.fullName}. Press 'view bill' to see more information on this site. From ${dataSource.name}.`
  ),
  cosponsoredLegislation: ({entity, dataSource}) => (
    `Searchable list of bills cosponsored by ${entity.fullName}. Press 'view bill' to see more information on this site. From ${dataSource.name}.`
  ),
  links: ({entity, dataSource}) => (
    `Various links related to ${entity.fullName} from multiple sources. It is highly recommended to explore these links if you want to learn more about ${entity.fullName}.`
  ),
  bill: ({entity, dataSource}) => (
    `Basic information about this bill from ${dataSource.name}.`
  ),
  sponsors: ({entity, dataSource}) => (
    `A list of legislators who sponsored this bill. From ${dataSource.name}.`
  ),
  summary: ({entity, dataSource}) => (
    `Any available summaries of this bill from ${dataSource.name}.`
  ),
  org: ({entity, dataSource}) => (
    `Basic information about ${entity.orgname} from ${dataSource.name}.`
  ),
  breakdown: ({entity, dataSource}) => (
    `Breakdown of how ${entity.orgname} spends to support candidates and committees. From ${dataSource}.`
  )
};

const dictionary = {
  
}

const InfoPanel = ({entity, cardKey, word, location}) => (
  <div className='p-4 text-wrap'>
    {cardKey ? cardIntros[cardKey]({
      entity, dataSource: copy.dataSources[cardSourceMap[cardKey]]
    }) : (
      dictionary[word]()
    )}
  </div>
);

export default InfoPanel;