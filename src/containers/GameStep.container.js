import React from 'react'
import GameStep from '../components/GameBoard/GameSteps/GameStep'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addIAE, applyAction, updateScore } from '../actions/gameActions'

class GameStepContainer extends React.Component {
  constructor (props) {
    super(props)
    this.onValidateIAEs = this.onValidateIAEs.bind(this)
    this.onValidateAction = this.onValidateAction.bind(this)
  }

  onValidateIAEs () {
    // Send IAEs implemented to Server
    this.props.addIAE(this.props.game._id, this.props.iaeImplemented, this.props.circleIaeImplemented, this.props.game.production, this.props.game.environnement, this.props.game.ancrageSocial, this.props.game.tempsTravail)
  }

  onValidateAction () {
    // Send Action selected to server
    this.props.applyAction(this.props.game._id, this.props.actionSelected, this.props.game.production, this.props.game.environnement, this.props.game.ancrageSocial, this.props.game.tempsTravail)
  }

  render () {
    return (
      <GameStep
        handleValidateIAEs={this.onValidateIAEs}
        timerLaunched={this.props.timerLaunched}
        actionSelected={this.props.actionSelected}
        onChangeAction={this.props.onChangeAction}
        handleValidateAction={this.onValidateAction}
      />
    )
  }
}

GameStepContainer.propTypes = {
  game: PropTypes.object.isRequired,
  addIAE: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  applyAction: PropTypes.func.isRequired,
  // STEP 1
  timerLaunched: PropTypes.bool.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  circleIaeImplemented: PropTypes.array.isRequired,
  // STEP 2
  actionSelected: PropTypes.number.isRequired,
  onChangeAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { addIAE, updateScore, applyAction }
)(GameStepContainer)
