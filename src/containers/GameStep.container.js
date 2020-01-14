import React from 'react'
import GameStep from '../components/GameBoard/GameSteps/GameStep'
import PropTypes from 'prop-types'
import * as APIFetch from '../helpers/APIFetch'

class GameStepContainer extends React.Component {
  constructor (props) {
    super(props)
    this.onValidateIAEs = this.onValidateIAEs.bind(this)
  }

  onValidateIAEs () {
    // Send IAEs implemented to Server
    const resource = 'api/public/game/' + this.props.idGame + '/IAE'
    APIFetch.fetchRuralisAPI(
      resource,
      { IAEs: this.props.iaeImplemented, circleIAEs: this.props.circleIaeImplemented },
      APIFetch.POST
    ).then(() => {
      console.log(this.props)
      APIFetch.fetchRuralisAPI(
        'api/public/game/' + this.props.idGame + '/scoring',
        { production: this.props.production, environnement: this.props.environnement, ancrageSocial: this.props.ancrageSocial, tempsTravail: this.props.tempsTravail },
        APIFetch.PUT)
    })

      .catch(err => console.log(err))
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
  idGame: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
  timerLaunched: PropTypes.bool.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  circleIaeImplemented: PropTypes.array.isRequired
}

export default GameStepContainer
