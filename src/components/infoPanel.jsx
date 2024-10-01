import React from 'react';

import { copy, cardSourceMap } from 'global';

const cardIntros = {
  bio: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  ),
  candContrib: ({entity, dataSource}) => (
    `Organizations that have spent the most money supporting ${entity.fullName}. From ${dataSource.name}.`
  ),
  memProf: ({entity, dataSource}) => (
    `Information from ${dataSource.name} about assets owned by ${entity.fullName}.`
  ),
  sponsoredLegislation: ({entity, dataSource}) => (
    `Searchable list of bills sponsored by ${entity.fullName}. Press 'view bill' to see more information on this site. From ${dataSource.name}.`
  ),
  cosponsoredLegislation: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  ),
  links: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  )
};

const InfoPanel = ({entity, cardKey}) => {
  const dataSource = copy.dataSources[cardSourceMap[cardKey]];

  return (
    <div className='p-4 text-wrap'>
      {cardIntros[cardKey]({entity, dataSource})}
    </div>
  );
}

export default InfoPanel;