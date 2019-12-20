import React from 'react'

import NewGame from '../components/NewGame/NewGame'

class NewGameContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nbPlayers: 5,
      scenario: ''
    }
    this.onClickNewGame = this.onClickNewGame.bind(this)
    this.onChangePlayers = this.onChangePlayers.bind(this)
    this.onChangeScenario = this.onChangeScenario.bind(this)
  }

  onClickNewGame () {
    // Send game data to server
    // TODO
    const params = {
      players: this.randomPlayers(),
      scenario: this.state.scenario
    }
    console.log(params)
  }

  onChangePlayers (e) {
    console.log(e.target.value)

    this.setState({
      nbPlayers: e.target.value
    })
  }

  onChangeScenario = (e, { value }) => {
    console.log('SCENARIO : ' + value)
    this.setState({ scenario: value })
  }

  randomPlayers () {
    switch (this.state.nbPlayers) {
      case 5:
        return []
      case 6:
        return []
      case 7:
        return []
      default:
        return []
    }
  }

  render () {
    return (
      <NewGame
        handleOnClick={this.onClickNewGame}
        handleOnChangePlayers={this.onChangePlayers}
        nbPlayers={this.state.nbPlayers}
        scenario={this.state.scenario}
        handleChangeScenario={this.onChangeScenario}
      />
    )
  }
}

export default NewGameContainer
