import React from 'react'
import GameStep from '../components/GameBoard/GameSteps/GameStep'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addIAE, applyAction, updateScore } from '../actions/gameActions'

import actions from '../config/actionsCards'

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
    if (this.props.actionSelected !== -1) {
      const card = actions.find(card => card.numCard === this.props.actionSelected)
      const newProduction = this.props.game.production + card.productionEffect
      const newEnvironnement = this.props.game.environnement + card.environnementEffect
      const newAncrageSocial = this.props.game.ancrageSocial + card.ancrageSocialEffect
      const newTempsTravail = this.props.game.tempsTravail + card.tempsTravailEffect
      this.props.applyAction(this.props.game._id, this.props.actionSelected, newProduction, newEnvironnement, newAncrageSocial, newTempsTravail)
    } else {
      this.props.applyAction(this.props.game._id, this.props.actionSelected, this.props.game.production, this.props.game.environnement, this.props.game.tempsTravail, this.props.game.tempsTravail)
    }
  }

  render () {
    return (
      <GameStep
        handleValidateIAEs={this.onValidateIAEs}
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
