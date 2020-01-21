import React from 'react'
import ListIAE from '../../components/Player/ListIAE'

class ListIAEContainer extends React.Component {
  render () {
    const playerNumber = Number(this.props.match.params.playerNumber)

    return (
      <ListIAE playerNumber={playerNumber} />
    )
  }
}

export default ListIAEContainer
