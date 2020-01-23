import React from 'react'
import PropTypes from 'prop-types'

import playersList from '../../config/playersList'
import { Container, Image } from 'semantic-ui-react'
import PlayerHeader from './PlayerHeader'

const PlayerRole = (props) => {
  const playerCard = playersList.find(player => player.number === props.playerNumber).card

  return (
    <div>
      <PlayerHeader playerNumber={props.playerNumber} activeTab='role' />

      <Container style={{ marginTop: '7em' }}>
        <Image centered src={playerCard} />
      </Container>
    </div>
  )
}

PlayerRole.propTypes = {
  playerNumber: PropTypes.number.isRequired
}

export default PlayerRole
