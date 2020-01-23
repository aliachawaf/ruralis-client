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
          <Checkbox slider checked={props.allCardsOpened} label='Voir tout' onClick={props.handleOpenAllCards} />
        </Container>

        <Divider />

        <Accordion
          exclusive={false}
          activeIndex={props.activeCardsIndex}
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
          onTitleClick={(e, value) => props.handleOnChangeAccordion(value)}
        />

      </Container>
    </div>
  )
}

ListIAE.propTypes = {
  playerNumber: PropTypes.number.isRequired,
  activeCardsIndex: PropTypes.array.isRequired,
  handleOnChangeAccordion: PropTypes.func.isRequired,
  handleOpenAllCards: PropTypes.func.isRequired,
  allCardsOpened: PropTypes.bool.isRequired
}

ListIAE.defaultProps = {
  activeCardsIndex: [],
  allCardsOpened: false
}

export default ListIAE
