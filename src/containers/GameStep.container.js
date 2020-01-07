import React from 'react'
import GameStep from '../components/GameBoard/GameSteps/GameStep'
import PropTypes from 'prop-types'
import * as APIFetch from '../helpers/APIFetch'

class GameStepContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.onValidateIAEs = this.onValidateIAEs.bind(this)
  }

  onValidateIAEs () {
    console.log(this.props.iaeImplemented)

    // Send IAEs implemented to Server
    // TODO
    const resource = 'api/public/game/:idGame/IAE'
    APIFetch.fetchRuralisAPI(resource, { IAES: this.props.iaeImplemented }, APIFetch.POST)
      .then()
      .catch()
  }

  render () {
    return (
      <GameStep
        handleValidateIAEs={this.onValidateIAEs}
        currentStep={this.props.currentStep}
        timerLaunched={this.props.timerLaunched}
      />
    )
  }
}

GameStepContainer.propTypes = {
  currentStep: PropTypes.number.isRequired,
  timerLaunched: PropTypes.bool.isRequired,
  iaeImplemented: PropTypes.array.isRequired
}

export default GameStepContainer
