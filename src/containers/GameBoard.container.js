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
      circleIaeImplemented: [],
      iaeGroupSelected: 0,
      iaeTypeSelected: 0,
      currentStep: 1,
      numTour: 0
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
          currentStep: res.data.game.step,
          iaeImplemented: res.data.game.implementedIAE,
          circleIaeImplemented: res.data.game.circleIAEs,
          numTour: res.data.game.numTour
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
  }

  onCreatedIAE (e) {
    if (e.layerType === 'circle') {
      const newIAE = {
        IAEGroup: this.state.iaeGroupSelected,
        IAEType: this.state.iaeTypeSelected,
        center: e.layer._latlng,
        radius: e.layer._radius
      }

      this.setState({
        circleIaeImplemented: this.state.circleIaeImplemented.concat(newIAE)
      })
    } else {
      const newIAE = {
        IAEGroup: this.state.iaeGroupSelected,
        IAEType: this.state.iaeTypeSelected,
        coords: e.layer._latlngs
      }

      this.setState({
        iaeImplemented: this.state.iaeImplemented.concat(newIAE)
      })
    }
  }

  onChangeIAEType = (group, type) => {
    this.setState({
      iaeGroupSelected: group,
      iaeTypeSelected: type
    })
  }

  render () {
    return (
      <GameBoard
        ref={mapRef}
        idGame={this.props.match.params.idGame}
        currentStep={this.state.currentStep}
        numTour={this.state.numTour}
        bounds={bounds}
        handleStartGame={this.onStartGame}
        opened={this.state.openedStartGameModal}
        gamePlayers={this.state.players}
        scenario={this.state.scenario}
        handleCreatedIAE={this.onCreatedIAE}
        iaeImplemented={this.state.iaeImplemented}
        circleIaeImplemented={this.state.circleIaeImplemented}
        iaeGroupSelected={this.state.iaeGroupSelected}
        iaeTypeSelected={this.state.iaeTypeSelected}
        handleIAETypeChange={this.onChangeIAEType}
      />
    )
  }
}

GameBoardContainer.propTypes = {}

export default GameBoardContainer
