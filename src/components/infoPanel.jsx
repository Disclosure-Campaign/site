import React from 'react';

import { copy, cardSourceMap } from 'global';

const cardIntros = {
  bio: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  ),
  candContrib: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  ),
  memProf: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  ),
  sponsoredLegislation: ({entity, dataSource}) => (
    `Basic information about ${entity.fullName} from ${dataSource.name}.`
  ),
  cosponsoredLegislation: ({entity, dataSource}) => (
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