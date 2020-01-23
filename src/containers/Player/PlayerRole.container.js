import React from 'react'
import PlayerRole from '../../components/Player/PlayerRole'

class PlayerRoleContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const playerNumber = Number(this.props.match.params.playerNumber)

    return (
      <PlayerRole playerNumber={playerNumber} />
    )
  }
}

export default PlayerRoleContainer
