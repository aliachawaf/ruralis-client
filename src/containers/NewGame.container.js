import React from 'react'

import NewGame from '../components/NewGame/NewGame'
import * as APIFetch from '../helpers/APIFetch'

class NewGameContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nbPlayers: 5,
      playersSelected: [4, 5],
      scenario: ''
    }
    this.onClickNewGame = this.onClickNewGame.bind(this)
    this.onChangeNbPlayers = this.onChangeNbPlayers.bind(this)
    this.onClickPlayer = this.onClickPlayer.bind(this)
    this.onChangeScenario = this.onChangeScenario.bind(this)
  }

  onClickNewGame () {
    // Send game data to server and redirect to game board
    // TODO
    const params = {
      players: this.state.playersSelected,
      scenario: this.state.scenario
    }
    console.log(params)
    const resource = 'api/public/game'
    APIFetch.fetchRuralisAPI(resource, params, APIFetch.POST)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  onChangeNbPlayers (e) {
    console.log('oui' + e.target.value)

    this.setState({
      nbPlayers: e.target.value
    })
  }

  onChangeScenario = (e, { value }) => {
    console.log('SCENARIO : ' + value)
    this.setState({ scenario: value })
  }

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
      />
    )
  }
}

export default NewGameContainer
