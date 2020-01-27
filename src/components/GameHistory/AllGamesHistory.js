import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RuralisHeader from '../common/RuralisHeader'

const AllGamesHistory = (props) => {
  console.log(props.games)
  return (
    <div>
      <RuralisHeader title='Historique des parties' />
    </div>
  )
}

AllGamesHistory.propTypes = {
  games: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  games: state.games
})

export default connect(
  mapStateToProps
)(AllGamesHistory)
