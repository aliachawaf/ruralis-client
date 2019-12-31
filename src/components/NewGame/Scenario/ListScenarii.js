import React from 'react'
import { Accordion, Grid } from 'semantic-ui-react'

import scenarii from '../../../config/scenarii'

const ListScenarii = () => (
  <Grid columns={2}>
    <Grid.Row>
      <Grid.Column>
        <Accordion
          panels={
            scenarii
              .slice(0, 3)
              .map(s => ({ key: s.number, title: 'Scénario ' + s.number + ' : ' + s.name }))
          }
          fluid
          styled
        />
      </Grid.Column>
      <Grid.Column>
        <Accordion
          panels={
            scenarii
              .slice(3, 6)
              .map(s => ({ key: s.number, title: 'Scénario ' + s.number + ' : ' + s.name }))
          }
          fluid
          styled
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default ListScenarii
