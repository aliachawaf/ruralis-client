import React from 'react'

import GameBoard from '../components/GameBoard/GameBoard'

import * as APIFetch from '../helpers/APIFetch'

import mapLegend from '../config/mapLegend'

const bounds = [[0, 0], [3330, 3825]]
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
      numTour: 0,
      production: 0,
      tempsTravail: 70,
      environnement: 0,
      ancrageSocial: 0
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
    console.log(e)
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
      this.updateScore(newIAE, e.layerType)
      console.log(this.state)
    } else {
      const newIAE = {
        IAEGroup: this.state.iaeGroupSelected,
        IAEType: this.state.iaeTypeSelected,
        coords: e.layer._latlngs
      }

      this.setState({
        iaeImplemented: this.state.iaeImplemented.concat(newIAE)
      })
      this.updateScore(newIAE, e.layerType)

      console.log(this.state)
    }
  }

  updateScore (newIAE, layerType) {
    const nbUnite = this.calculNbUnite(newIAE, layerType)

    const newEnv = mapLegend[newIAE.IAEGroup].environment
    const newTempsTravail = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].workingTime
    const newProduction = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].production

    if (newIAE) {
      this.setState({
        production: this.state.production + (nbUnite * newProduction),
        tempsTravail: this.state.tempsTravail + (nbUnite * newTempsTravail),
        environnement: this.state.environnement + (nbUnite * newEnv)
      })
    }
  }

  calculNbUnite (newIAE, layerType) {
    if (layerType === 'circle') {
      return 1
    } else {
      if (newIAE.coords.length === 2) { // line
        return (mapRef.current.leafletElement.distance(newIAE.coords[0], newIAE.coords[1]) / 150)
      }
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
