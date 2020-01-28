import React from 'react'
import { Accordion, Image } from 'semantic-ui-react'

import scenarii from '../../../config/scenarii'

const ListScenarii = () => (
  <Accordion
    panels={
      scenarii
        .map(s => ({
          key: s.number,
          title: 'Scénario ' + s.number + ' : ' + s.name,
          content: {
            content:
  <div>
    <Image src={s.description} centered size='huge' />
    <Image src={s.map} centered size='huge' />
  </div>
          }
        }))
    }
    fluid
    styled
  />
)

export default ListScenarii
