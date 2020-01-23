import React from 'react'
import PropTypes from 'prop-types'
import PlayerHeader from './PlayerHeader'
import { Accordion, Checkbox, Container, Divider, Image } from 'semantic-ui-react'
import actions from '../../config/actionsCards'

const LivretGEA = (props) => {
  return (
    <div>
      <PlayerHeader playerNumber={props.playerNumber} activeTab='GEA' />

      <Container style={{ marginTop: '7em' }}>

        <Container textAlign='right'>
          <Checkbox slider checked={props.allCardsOpened} label='Voir tout' onClick={props.handleOpenAllCards} />
        </Container>

        <Divider />

        <Accordion
          exclusive={false}
          activeIndex={props.activeCardsIndex}
          panels={
            actions
              .map(action => ({
                key: action.numCard,
                value: action.numCard,
                title: action.numCard + '. ' + action.title,
                content: {
                  content:
  <div>
    <Image src={action.cardPicture} centered />
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

LivretGEA.propTypes = {
  playerNumber: PropTypes.number.isRequired,
  activeCardsIndex: PropTypes.array.isRequired,
  handleOnChangeAccordion: PropTypes.func.isRequired,
  handleOpenAllCards: PropTypes.func.isRequired,
  allCardsOpened: PropTypes.bool.isRequired
}

LivretGEA.defaultProps = {
  activeCardsIndex: [],
  allCardsOpened: false
}

export default LivretGEA
