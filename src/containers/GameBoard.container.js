import React from 'react'
import { connect } from 'react-redux'
import GameBoard from '../components/GameBoard/GameBoard'
import PropTypes from 'prop-types'
import L from 'leaflet'

import mapLegend from '../config/mapLegend'

import { fetchGame, startGame, tmpScore } from '../actions/gameActions'

const bounds = [[0, 0], [3330, 3825]]

class GameBoardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openedStartGameModal: true,
      iaeImplemented: [],
      iaeMarkerImplemented: [],
      iaeGroupSelected: 0,
      iaeTypeSelected: 0,
      actionSelected: -1,
      deletingIAE: false,
      IAEtoDelete: [],
      decoratorMarkersToDelete: [],
      IAEmarkerToDelete: [],
      errorPrairie: false,
      errorZero: false,
      errorTypesIAE: false,
      errorMare: false
    }
    this.mapRef = React.createRef()
    this.onStartGame = this.onStartGame.bind(this)
    this.onCreatedIAE = this.onCreatedIAE.bind(this)
    this.onChangeIAEType = this.onChangeIAEType.bind(this)
    this.onChangeAction = this.onChangeAction.bind(this)
    this.clearAllIAEs = this.clearAllIAEs.bind(this)
    this.onDeleteIAE = this.onDeleteIAE.bind(this)
    this.onChangeDeletingIAE = this.onChangeDeletingIAE.bind(this)
    this.onValidateDeletingIAE = this.onValidateDeletingIAE.bind(this)
    this.onCancelDeletingIAE = this.onCancelDeletingIAE.bind(this)
  }

  componentDidMount () {
    this.mapRef.current.leafletElement.fitBounds(bounds)

    const idGame = this.props.match.params.idGame

    this.props.fetchGame(idGame)
  }

  onStartGame () {
    const idGame = this.props.match.params.idGame
    this.setState({
      openedStartGameModal: false
    })
    this.props.startGame(idGame)
  }

  onCreatedIAE (e) {
    // Remove the layer drawn from map, then add it in state, then display it from state
    this.mapRef.current.leafletElement.removeLayer(e.layer)
    let stop = false

    // check the rule of 5 prairie
    if (mapLegend[this.state.iaeGroupSelected].iaeGroup === 'Prairie Permanente') {
      let nbPrairie = 0
      this.props.game.implementedIAE.forEach(iae => { if (iae.IAEGroup === this.state.iaeGroupSelected) { nbPrairie += iae.unity } })
      this.state.iaeImplemented.forEach(iae => { if (iae.IAEGroup === this.state.iaeGroupSelected) { nbPrairie += iae.unity } })
      nbPrairie += this.calculNbUnite(e.layer._latlngs)

      if (nbPrairie >= 5 && !this.props.game.actionsDone.includes(3)) {
        this.setState({ errorPrairie: true })
        stop = true
      }
    }

    // check the rule of 5 mares
    if (mapLegend[this.state.iaeGroupSelected].iaeGroup === 'Mares') {
      let nbMares = 0
      this.props.game.circleIAEs.forEach(iae => { if (iae.IAEGroup === this.state.iaeGroupSelected) { nbMares++ } })
      this.state.iaeMarkerImplemented.forEach(iae => { if (iae.IAEGroup === this.state.iaeGroupSelected) { nbMares++ } })

      if (nbMares === 5) {
        this.setState({ errorMare: true })
        stop = true
      }
    }

    // check 2 types IAE
    if (this.state.iaeImplemented.length > 0) {
      if (this.state.iaeImplemented[0].IAEGroup !== this.state.iaeGroupSelected) {
        this.setState({ errorTypesIAE: true })
        stop = true
      }
    }

    // check 2 types IAE
    if (this.state.iaeMarkerImplemented.length > 0) {
      if (this.state.iaeMarkerImplemented[0].IAEGroup !== this.state.iaeGroupSelected) {
        this.setState({ errorTypesIAE: true })
        stop = true
      }
    }

    if (!stop) {
      if (e.layerType === 'circlemarker') {
        const newIAE = {
          IAEGroup: this.state.iaeGroupSelected,
          IAEType: this.state.iaeTypeSelected,
          center: e.layer._latlng,
          unity: 1,
          layerType: e.layerType
        }

        this.setState({
          iaeMarkerImplemented: this.state.iaeMarkerImplemented.concat(newIAE)
        })
        this.updateScore(newIAE)
      } else {
        const newIAE = {
          IAEGroup: this.state.iaeGroupSelected,
          IAEType: this.state.iaeTypeSelected,
          coords: (e.layerType === 'polyline') ? e.layer._latlngs : e.layer._latlngs[0],
          unity: this.calculNbUnite(e.layer._latlngs),
          layerType: e.layerType
        }

        if (this.updateScore(newIAE)) {
          this.setState({
            iaeImplemented: this.state.iaeImplemented.concat(newIAE)
          })
        } else {
          this.setState({ errorZero: true })
        }
      }
    }
  }

  updateScore (newIAE) {
    const nbUnite = newIAE.unity

    const envPerUnit = mapLegend[newIAE.IAEGroup].environment
    const tempsTravailPerUnit = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].workingTime
    const productionPerUnit = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].production

    const newProduction = Math.round(this.props.game.production + nbUnite * productionPerUnit)
    const newTempsTravail = Math.round(this.props.game.tempsTravail + nbUnite * tempsTravailPerUnit)
    const newEnv = Math.round(this.props.game.environnement + nbUnite * envPerUnit)

    if (newTempsTravail >= 0) {
      this.props.tmpScore(newProduction, newEnv, this.props.game.ancrageSocial, newTempsTravail)
      return true
    } else {
      return false
    }
  }

  calculNbUnite (iaeCoords) {
    if (iaeCoords.length === 2) {
      const unity = (this.mapRef.current.leafletElement.distance(iaeCoords[0], iaeCoords[1]) / 150)
      return Math.round(unity * 10) / 10
    } else {
      const arr = iaeCoords[0]
      const X = []
      const Y = []
      arr.forEach(coord => {
        X.push(coord.lng)
        Y.push(coord.lat)
      })
      return Math.round((Math.abs(this.polygonArea(X, Y, arr.length)) / 22500) * 10) / 10
    }
  }

  polygonArea (X, Y, numPoints) {
    let area = 0 // Accumulates area
    let j = numPoints - 1

    for (var i = 0; i < numPoints; i++) {
      area += (X[j] + X[i]) * (Y[j] - Y[i])
      j = i // j is previous vertex to i
    }
    return area / 2
  }

  onChangeIAEType = (group, type) => {
    this.setState({
      iaeGroupSelected: group,
      iaeTypeSelected: type
    })
  }

  onChangeAction = (e, { value }) => {
    if (value === this.state.actionSelected) {
      // Uncheck action
      this.setState({ actionSelected: -1 })
    } else {
      // Check action
      this.setState({ actionSelected: value })
    }
  }

  /** *************** IAE DELETING  *****************/
  clearAllIAEs () {
    this.setState({ iaeImplemented: [], iaeMarkerImplemented: [] })
  }

  onChangeDeletingIAE (deletingIAE) { this.setState({ deletingIAE: deletingIAE }) }

  onDeleteIAE (e, iae) {
    if (this.state.deletingIAE) {
      if (iae.layerType === 'circlemarker') {
        const indexIaeToRemove = this.state.iaeMarkerImplemented.indexOf(iae)

        this.setState({
          IAEmarkerToDelete: this.state.IAEmarkerToDelete.concat(iae),
          iaeMarkerImplemented: this.state.iaeMarkerImplemented.filter((_, i) => i !== indexIaeToRemove)
        })
      } else {
        const indexIaeToRemove = this.state.iaeImplemented.indexOf(iae)

        this.setState({
          IAEtoDelete: this.state.IAEtoDelete.concat(iae),
          iaeImplemented: this.state.iaeImplemented.filter((_, i) => i !== indexIaeToRemove)
        })

        this.setDecoratorMarkersToDelete(iae)
      }
    }
  }

  // Get the markers used to decorate the iae in order to delete them
  setDecoratorMarkersToDelete (iae) {
    // Get all the markers present on the map
    let markers = []
    this.mapRef.current.leafletElement.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        markers = markers.concat(layer)
      }
    })

    // Only iae lines containes decorator markers (not polygons)
    if (iae.layerType === 'polyline') {
      const iaeBounds = L.latLngBounds(iae.coords[0], iae.coords[1])

      markers.map(marker => {
        if (iaeBounds.contains(marker._latlng)) {
          // Set marker in state in order to add again on map if deletion is canceled
          this.setState({ decoratorMarkersToDelete: this.state.decoratorMarkersToDelete.concat(marker) })

          // Remove marker from map
          this.mapRef.current.leafletElement.removeLayer(marker)
        }
      }
      )
    }
  }

  onValidateDeletingIAE () {
    this.setState({
      IAEtoDelete: [],
      decoratorMarkersToDelete: [],
      IAEmarkerToDelete: []
    })

    this.onChangeDeletingIAE(false)
  }

  onCancelDeletingIAE () {
    // Add decorator markers removed
    this.state.decoratorMarkersToDelete.map(marker => this.mapRef.current.leafletElement.addLayer(marker))

    this.setState({
      iaeImplemented: this.state.iaeImplemented.concat(this.state.IAEtoDelete),
      iaeMarkerImplemented: this.state.iaeMarkerImplemented.concat(this.state.IAEmarkerToDelete),
      IAEtoDelete: [],
      decoratorMarkersToDelete: [],
      IAEmarkerToDelete: []
    })

    this.onChangeDeletingIAE(false)
  }

  onCloseError = () => {
    this.setState({
      errorPrairie: false,
      errorZero: false,
      errorTypesIAE: false,
      errorMare: false
    })
  }

  clearIAEsimplemented = () => { this.setState({ iaeImplemented: [], iaeMarkerImplemented: [] }) }

  render () {
    return (
      <GameBoard
        ref={this.mapRef}
        bounds={bounds}
        handleStartGame={this.onStartGame}
        opened={this.state.openedStartGameModal}
        handleIAETypeChange={this.onChangeIAEType}
        handleCreatedIAE={this.onCreatedIAE}
        iaeImplemented={this.state.iaeImplemented}
        iaeMarkerImplemented={this.state.iaeMarkerImplemented}
        clearAllIAEs={this.clearAllIAEs}
        iaeGroupSelected={this.state.iaeGroupSelected}
        iaeTypeSelected={this.state.iaeTypeSelected}
        actionSelected={this.state.actionSelected}
        handleOnChangeAction={this.onChangeAction}
        clearIAEsimplemented={this.clearIAEsimplemented}

        handleonChangeDeleting={this.onChangeDeletingIAE}
        handleDeleteIAE={this.onDeleteIAE}
        handleValidateDeletingIAE={this.onValidateDeletingIAE}
        handleCancelDeletingIAE={this.onCancelDeletingIAE}

        errorPrairie={this.state.errorPrairie}
        errorScore={this.state.errorZero}
        errorTypesIAE={this.state.errorTypesIAE}
        errorMare={this.state.errorMare}
        handleOnCloseError={this.onCloseError}
      />
    )
  }
}

GameBoardContainer.propTypes = {
  game: PropTypes.object.isRequired,
  fetchGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  tmpScore: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { fetchGame, startGame, tmpScore }
)(GameBoardContainer)
