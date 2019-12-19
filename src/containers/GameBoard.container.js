import React from 'react'

import GameBoard from '../components/GameBoard/GameBoard'

import * as APIFetch from '../helpers/APIFetch'

const bounds = [[0, 0], [900, 1050]]
const mapRef = React.createRef()

class GameBoardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      iaeImplemented: [],
      iaeTypeSelected: 0
    }
    this.onCreatedIAE = this.onCreatedIAE.bind(this)
    this.onIAETypeChange = this.onIAETypeChange.bind(this)
    this.onValidateIAEs = this.onValidateIAEs.bind(this)
  }

  componentDidMount () {
    mapRef.current.leafletElement.fitBounds(bounds)
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

  onIAETypeChange (e) {
    this.setState({ iaeTypeSelected: e.target.value })
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
        handleCreatedIAE={this.onCreatedIAE}
        iaeImplemented={this.state.iaeImplemented}
        iaeTypeSelected={this.state.iaeTypeSelected}
        handleIAETypeChange={this.onIAETypeChange}
        handleValidateIAEs={this.onValidateIAEs}
      />
    )
  }
}

GameBoardContainer.propTypes = {}

export default GameBoardContainer
