import React from 'react'

import GameBoard from '../components/GameBoard/GameBoard'

import * as APIFetch from '../helpers/APIFetch'
import players from '../config/players'

const bounds = [[0, 0], [900, 1050]]
const mapRef = React.createRef()

class GameBoardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openedStartGameModal: true,
      iaeImplemented: [],
      iaeTypeSelected: '00'
    }
    this.onStartGame = this.onStartGame.bind(this)
    this.onCreatedIAE = this.onCreatedIAE.bind(this)
    this.onChangeIAEType = this.onChangeIAEType.bind(this)
    this.onValidateIAEs = this.onValidateIAEs.bind(this)
  }

  componentDidMount () {
    mapRef.current.leafletElement.fitBounds(bounds)
  }

  onStartGame () {
    // const idGame = this.props.match.params.idGame
    const idGame = 19
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

  onValidateIAEs () {
    console.log('validate : ' + this.state.iaeImplemented)

    // Send IAEs implemented to Server
    // TODO
    const resource = 'api/public/game/:idGame/IAE'
    APIFetch.fetchRuralisAPI(resource, { IAES: this.state.iaeImplemented }, APIFetch.POST)
      .then()
      .catch()
  }

  render () {
    return (
      <GameBoard
        ref={mapRef}
        bounds={bounds}
        handleStartGame={this.onStartGame}
        opened={this.state.openedStartGameModal}
        players={players} // TODO get players selected in game creation
        handleCreatedIAE={this.onCreatedIAE}
        iaeImplemented={this.state.iaeImplemented}
        iaeTypeSelected={this.state.iaeTypeSelected}
        handleIAETypeChange={this.onChangeIAEType}
        handleValidateIAEs={this.onValidateIAEs}
      />
    )
  }
}

GameBoardContainer.propTypes = {}

export default GameBoardContainer
