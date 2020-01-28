import React from 'react'

import NewGame from '../components/NewGame/NewGame'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { createGame } from '../actions/gameActions'

class NewGameContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nbPlayers: 5,
      playersSelected: [4, 5],
      scenario: -1,
      error: false
    }
    this.onClickNewGame = this.onClickNewGame.bind(this)
    this.onChangeNbPlayers = this.onChangeNbPlayers.bind(this)
    this.onClickPlayer = this.onClickPlayer.bind(this)
    this.onChangeScenario = this.onChangeScenario.bind(this)
  }

  onClickNewGame () {
    const error = (this.state.nbPlayers !== this.state.playersSelected.length || this.state.scenario === -1)

    console.log(this.state.nbPlayers !== this.state.playersSelected.length)

    if (error) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })

      this.props.createGame(this.state.playersSelected, this.state.scenario, this.props.history)
    }
  }

  onChangeNbPlayers (e) {
    const newNbPlayers = parseInt(e.target.value)

    if (newNbPlayers < this.state.nbPlayers) {
      this.setState({ playersSelected: [4, 5] })
    }

    this.setState({ nbPlayers: newNbPlayers })
  }

  onChangeScenario = (e, { value }) => this.setState({ scenario: value })

  onClickPlayer = (playerIndex) => {
    const playersSelected = this.state.playersSelected

    if (playersSelected.includes(playerIndex)) {
      // Remove the player from the selected ones
      const indexToRemove = playersSelected.indexOf(playerIndex)
      this.setState({
        playersSelected: playersSelected.filter((_, i) => i !== indexToRemove)
      })
    } else {
      // Add the player to the selected ones
      this.setState({
        playersSelected: [...playersSelected, playerIndex]
      })
    }
  }

  render () {
    return (
      <NewGame
        handleOnClick={this.onClickNewGame}
        handleOnChangeNbPlayers={this.onChangeNbPlayers}
        nbPlayers={this.state.nbPlayers}
        handleOnClickPlayer={this.onClickPlayer}
        playersSelected={this.state.playersSelected}
        scenario={this.state.scenario}
        handleChangeScenario={this.onChangeScenario}
        error={this.state.error}
      />
    )
  }
}

NewGameContainer.propTypes = {
  game: PropTypes.object.isRequired,
  createGame: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { createGame }
)(NewGameContainer)
