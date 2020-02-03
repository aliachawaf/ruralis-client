import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchAllGames } from '../actions/gameActions'
import JoinGame from '../components/JoinGame/JoinGame'

class JoinGameContainer extends React.Component {
  componentDidMount () {
    this.props.fetchAllGames()
  }

  redirectToGameBoard = (idGame) => { this.props.history.push('/game/board/' + idGame) }

  render () {
    return (
      <JoinGame redirectToGameBoard={this.redirectToGameBoard} />
    )
  }
}

JoinGameContainer.propTypes = {
  game: PropTypes.object.isRequired,
  fetchGame: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { fetchAllGames }
)(JoinGameContainer)
