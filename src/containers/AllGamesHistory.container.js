import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchAllGames } from '../actions/gameActions'
import AllGamesHistory from '../components/GameHistory/AllGamesHistory'

class AllGamesHistoryContainer extends React.Component {
  componentDidMount () {
    this.props.fetchAllGames()
  }

  render () {
    console.log('la')
    return (
      <AllGamesHistory />
    )
  }
}

AllGamesHistoryContainer.propTypes = {
  game: PropTypes.object.isRequired,
  fetchGame: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { fetchAllGames }
)(AllGamesHistoryContainer)
