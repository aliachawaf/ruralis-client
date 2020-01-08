import React from 'react'

import NewGame from '../components/NewGame/NewGame'
import * as APIFetch from '../helpers/APIFetch'

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

    if (error) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      // Send game data to server and redirect to game board
      const params = {
        players: this.state.playersSelected,
        scenario: this.state.scenario
      }
      const resource = 'api/public/game'
      APIFetch.fetchRuralisAPI(resource, params, APIFetch.POST)
        .then(res => this.props.history.push('/game/board/' + res.data.game._id))
        .catch(err => console.log(err))
    }
  }

  onChangeNbPlayers (e) {
    this.setState({ nbPlayers: e.target.value })
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

export default NewGameContainer
