import React from 'react'

import GameBoard from '../components/GameBoard/GameBoard'

import * as APIFetch from '../helpers/APIFetch'

const bounds = [[0, 0], [900, 1050]]
const mapRef = React.createRef()

class GameBoardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openedStartGameModal: true,
      players: [],
      scenario: -1,
      iaeImplemented: [],
      iaeTypeSelected: '00',
      currentStep: 1
    }
    this.onStartGame = this.onStartGame.bind(this)
    this.onCreatedIAE = this.onCreatedIAE.bind(this)
    this.onChangeIAEType = this.onChangeIAEType.bind(this)
  }

  componentDidMount () {
    mapRef.current.leafletElement.fitBounds(bounds)

    // Get game info
    const idGame = this.props.match.params.idGame
    const resource = 'api/public/game/' + idGame

    APIFetch.fetchRuralisAPI(resource, {}, APIFetch.GET)
      .then(res => {
        this.setState({
          players: res.data.game.players,
          scenario: res.data.game.scenario,
          currentStep: res.data.game.step
        })
      })
      .catch(err => console.log(err))
  }

  onStartGame () {
    const idGame = this.props.match.params.idGame
    const resource = 'api/public/game/' + idGame + '/start'
    APIFetch.fetchRuralisAPI(resource, {}, APIFetch.PUT)
      .then(() => {
        this.setState({
          openedStartGameModal: false
        })
      })
      .catch(err => console.log(err))
    // TODO launch timer for first round
  }

  onCreatedIAE (e) {
    let newIAE

    if (e.layerType === 'circle') {
      newIAE = {
        id: this.state.iaeTypeSelected,
        drawingType: e.layerType,
        center: e.layer._latlng,
        radius: e.layer._radius
      }
    } else {
      newIAE = {
        id: this.state.iaeTypeSelected,
        drawingType: e.layerType,
        positions: e.layer._latlngs
      }
    }

    this.setState({
      iaeImplemented: this.state.iaeImplemented.concat(newIAE)
    })
  }

  onChangeIAEType = (e, { value }) => {
    this.setState({ iaeTypeSelected: value })
  }

  render () {
    return (
      <GameBoard
        ref={mapRef}
        currentStep={this.state.currentStep}
        gameId={this.props.match.params.idGame}
        bounds={bounds}
        handleStartGame={this.onStartGame}
        opened={this.state.openedStartGameModal}
        gamePlayers={this.state.players}
        scenario={this.state.scenario}
        handleCreatedIAE={this.onCreatedIAE}
        iaeImplemented={this.state.iaeImplemented}
        iaeTypeSelected={this.state.iaeTypeSelected}
        handleIAETypeChange={this.onChangeIAEType}
      />
    )
  }
}

GameBoardContainer.propTypes = {}

export default GameBoardContainer
