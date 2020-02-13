import React from 'react'
import GameStep from '../components/GameBoard/GameSteps/GameStep'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addEventCards, addIAE, applyAction, endgame, tmpScore, updateScore } from '../actions/gameActions'

import actions from '../config/actionsCards'
import eventCards from '../config/eventCards'

class GameStepContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cardsPicked: [],
      // End Game
      playersWinners: [],
      isObjectiveAchieved: false,
      victory: false
    }
    this.onValidateIAEs = this.onValidateIAEs.bind(this)
    this.onValidateAction = this.onValidateAction.bind(this)
    this.onValidateEndGame = this.onValidateEndGame.bind(this)
    this.onValidateEventCards = this.onValidateEventCards.bind(this)
  }

  /** STEP 1 **/
  onValidateIAEs () {
    const iaeImplemented = [...this.props.iaeImplemented]
    const iaeMarkerImplemented = [...this.props.iaeMarkerImplemented]

    // Send IAEs implemented to Server
    this.props.addIAE(
      this.props.game._id,
      iaeImplemented,
      iaeMarkerImplemented,
      this.props.game.production,
      this.props.game.environnement,
      this.props.game.ancrageSocial,
      this.props.game.tempsTravail
    )

    // Clear iae implemented array for next tour
    this.props.clearIAEsimplemented()
  }

  /** STEP 2 **/
  onValidateAction () {
    // Send Action selected to server
    if (this.props.actionSelected !== -1) {
      const card = actions.find(card => card.numCard === this.props.actionSelected)
      const newProduction = this.props.game.production + card.productionEffect
      const newEnvironnement = this.props.game.environnement + card.environnementEffect
      const newAncrageSocial = this.props.game.ancrageSocial + card.ancrageSocialEffect
      const newTempsTravail = this.props.game.tempsTravail + card.tempsTravailEffect
      this.props.applyAction(this.props.game._id, this.props.actionSelected, newProduction, newEnvironnement, newAncrageSocial, newTempsTravail)

      this.props.onChangeAction(undefined, { value: -1 })
    } else {
      this.props.applyAction(this.props.game._id, this.props.actionSelected, this.props.game.production, this.props.game.environnement, this.props.game.ancrageSocial, this.props.game.tempsTravail)
    }
  }

  /** STEP 3 **/
  onChangeScore = (production, tempsTravail, environnement, ancrageSocial) => {
    this.props.tmpScore(production, environnement, ancrageSocial, tempsTravail)
  }

  // Get a random event card not already picked before
  pickCard = () => {
    const min = 1
    const max = eventCards.length
    const random = Math.floor(Math.random() * (max - min + 1)) + min

    // Check if the card is already picked in last tours or in this tour
    if (this.props.game.cardsPicked.includes(random) || this.state.cardsPicked.includes(random)) {
      this.pickCard()
    } else {
      this.setState({ cardsPicked: this.state.cardsPicked.concat(random) })
    }
  }

  onValidateEventCards () {
    this.setState({ cardsPicked: [] })
    this.props.addEventCards(this.props.game._id, this.state.cardsPicked, this.props.game.production, this.props.game.environnement, this.props.game.ancrageSocial, this.props.game.tempsTravail)
  }

  /** END GAME **/
  onChangeObjectiveAchieved = () => {
    const newIsObjectiveAchieved = !this.state.isObjectiveAchieved
    this.setState({ isObjectiveAchieved: newIsObjectiveAchieved })
    this.calculateVictory(newIsObjectiveAchieved, this.state.playersWinners)
  }

  onChangePlayerWinner = (e, { value }) => {
    if (this.state.playersWinners.includes(value)) {
      // Remove player from winners
      const playerIndex = this.state.playersWinners.indexOf(value)
      const newPlayersWinners = this.state.playersWinners.filter((_, i) => i !== playerIndex)

      this.setState({ playersWinners: newPlayersWinners })
      this.calculateVictory(this.state.isObjectiveAchieved, newPlayersWinners)
    } else {
      // Add player as winner
      const newPlayersWinners = this.state.playersWinners.concat(value)

      this.setState({ playersWinners: newPlayersWinners })
      this.calculateVictory(this.state.isObjectiveAchieved, newPlayersWinners)
    }
  }

  calculateVictory = (isObjectiveAchieved, winners) => {
    if (isObjectiveAchieved) {
      const nbPlayers = this.props.game.players.length
      const nbWinners = winners.length

      if (nbPlayers === 5 && nbWinners >= 4) {
        this.setState({ victory: true })
      } else if (nbPlayers === 6 && nbWinners >= 5) {
        this.setState({ victory: true })
      } else if (nbPlayers === 7 && nbWinners >= 5) {
        this.setState({ victory: true })
      } else {
        this.setState({ victory: false })
      }
    } else {
      this.setState({ victory: false })
    }
  }

  onValidateEndGame () {
    // Send victory and winners to server
    this.props.endgame(this.props.game._id, this.state.isObjectiveAchieved, this.state.playersWinners, this.state.victory)
  }

  render () {
    return (
      <GameStep
        // Step 1
        handleValidateIAEs={this.onValidateIAEs}
        // Step 2
        actionSelected={this.props.actionSelected}
        onChangeAction={this.props.onChangeAction}
        handleValidateAction={this.onValidateAction}
        // Step 3
        handleOnChangeScore={this.onChangeScore}
        pickCard={this.pickCard}
        cardsPicked={this.state.cardsPicked}
        handleOnValidateEventCards={this.onValidateEventCards}
        // End Game
        playersWinners={this.state.playersWinners}
        handleOnChangeObjectiveAchieved={this.onChangeObjectiveAchieved}
        handleOnChangePlayerWinner={this.onChangePlayerWinner}
        isObjectiveAchieved={this.state.isObjectiveAchieved}
        victory={this.state.victory}
        handleOnValidateEndGame={this.onValidateEndGame}
      />
    )
  }
}

GameStepContainer.propTypes = {
  game: PropTypes.object.isRequired,
  addIAE: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  applyAction: PropTypes.func.isRequired,
  endgame: PropTypes.func.isRequired,
  addEventCards: PropTypes.func.isRequired,
  tmpScore: PropTypes.func.isRequired,
  // STEP 1
  iaeImplemented: PropTypes.array.isRequired,
  iaeMarkerImplemented: PropTypes.array.isRequired,
  clearIAEsimplemented: PropTypes.func.isRequired,
  // STEP 2
  actionSelected: PropTypes.number.isRequired,
  onChangeAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { addIAE, updateScore, applyAction, endgame, addEventCards, tmpScore }
)(GameStepContainer)
