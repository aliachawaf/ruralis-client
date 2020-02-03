import React from 'react'
import PropTypes from 'prop-types'

import playersList from '../../config/playersList'
import { Container, Divider, Image, Label } from 'semantic-ui-react'
import PlayerHeader from './PlayerHeader'
import { Link } from 'react-router-dom'

const PlayerRole = (props) => {
  const playerCard = playersList.find(player => player.number === props.playerNumber).card

  return (
    <div>
      <PlayerHeader playerNumber={props.playerNumber} activeTab='role' />

      <Container style={{ marginTop: '7em' }}>
        <Image centered src={playerCard} />
      </Container>

      <Divider />

      <Container textAlign='right'>
        <Link to='/game/rules' target='_blank'>
          <Label as='a' icon='file' size='big' content='Règles du jeu' />
        </Link>
      </Container>
    </div>
  )
}

PlayerRole.propTypes = {
  playerNumber: PropTypes.number.isRequired
}

export default PlayerRole
