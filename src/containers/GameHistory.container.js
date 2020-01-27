import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchGame } from '../actions/gameActions'
import GameHistory from '../components/GameHistory/GameHistory'

const bounds = [[0, 0], [3330, 3825]]

class GameHistoryContainer extends React.Component {
  constructor (props) {
    super(props)

    this.mapRef = React.createRef()
  }

  componentDidMount () {
    this.mapRef.current.leafletElement.fitBounds(bounds)

    const idGame = this.props.match.params.idGame

    this.props.fetchGame(idGame)
  }

  render () {
    return (
      <GameHistory
        ref={this.mapRef}
        bounds={bounds}
      />
    )
  }
}

GameHistoryContainer.propTypes = {
  game: PropTypes.object.isRequired,
  fetchGame: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { fetchGame }
)(GameHistoryContainer)
