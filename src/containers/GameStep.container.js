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

  onValidateAction () {
    // Send Action selected to server
    const resource = 'api/public/game/' + this.props.idGame + '/action'
    APIFetch.fetchRuralisAPI(
      resource,
      { action: this.props.actionSelected },
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
        numTour={this.props.numTour}
        timerLaunched={this.props.timerLaunched}
        actionsDone={this.props.actionsDone}
        actionSelected={this.props.actionSelected}
        onChangeAction={this.props.onChangeAction}
        handleValidateAction={this.onValidateAction}
        ancrageSocial={this.props.ancrageSocial}
        environnement={this.props.environnement}
        production={this.props.production}
        tempsTravail={this.props.tempsTravail}
      />
    )
  }
}

GameStepContainer.propTypes = {
  idGame: PropTypes.string.isRequired,
  numTour: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  // STEP 1
  timerLaunched: PropTypes.bool.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  circleIaeImplemented: PropTypes.array.isRequired,
  // STEP 2
  actionsDone: PropTypes.array.isRequired,
  actionSelected: PropTypes.number.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  // SCORING
  production: PropTypes.number.isRequired,
  environnement: PropTypes.number.isRequired,
  tempsTravail: PropTypes.number.isRequired,
  ancrageSocial: PropTypes.number.isRequired
}

export default GameStepContainer
