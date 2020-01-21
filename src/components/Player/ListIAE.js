import React from 'react'
import PropTypes from 'prop-types'
import PlayerHeader from './PlayerHeader'
import { Accordion, Checkbox, Container, Divider, Image } from 'semantic-ui-react'
import mapLegend from '../../config/mapLegend'

const ListIAE = (props) => {
  return (
    <div>
      <PlayerHeader playerNumber={props.playerNumber} activeTab='IAE' />

      <Container style={{ marginTop: '7em' }}>

        <Container textAlign='right'>
          <Checkbox toggle label='Voir tout' />
        </Container>

        <Divider />

        <Accordion
          panels={
            mapLegend
              .map((group, index) => ({
                key: index,
                title: group.iaeGroup,
                content: {
                  content:
  <div>
    <Image src={group.iaeCard} centered />
  </div>
                }
              }))
          }
          fluid
          styled
        />

      </Container>
    </div>
  )
}

ListIAE.propTypes = {
  playerNumber: PropTypes.number.isRequired
}

ListIAE.defaultProps = {
  seeAll: false
}

export default ListIAE
