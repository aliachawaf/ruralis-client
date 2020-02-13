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
        this.updateScore(newIAE, true)
      } else {
        const newIAE = {
          IAEGroup: this.state.iaeGroupSelected,
          IAEType: this.state.iaeTypeSelected,
          coords: (e.layerType === 'polyline') ? e.layer._latlngs : e.layer._latlngs[0],
          unity: this.calculNbUnite(e.layer._latlngs),
          layerType: e.layerType
        }

        if (this.updateScore(newIAE, true)) {
          this.setState({
            iaeImplemented: this.state.iaeImplemented.concat(newIAE)
          })
        } else {
          this.setState({ errorZero: true })
        }
      }
    }
  }

  // Update the score with an IAE depending if it is added or deleted
  updateScore (IAE, iaeAdded) {
    const nbUnite = IAE.unity

    const envPerUnit = mapLegend[IAE.IAEGroup].environment
    const tempsTravailPerUnit = mapLegend[IAE.IAEGroup].iaeList[IAE.IAEType].workingTime
    const productionPerUnit = mapLegend[IAE.IAEGroup].iaeList[IAE.IAEType].production

    const newProduction = iaeAdded
      ? Math.round(this.props.game.production + nbUnite * productionPerUnit)
      : Math.round(this.props.game.production - nbUnite * productionPerUnit)

    const newTempsTravail = iaeAdded
      ? Math.round(this.props.game.tempsTravail + nbUnite * tempsTravailPerUnit)
      : Math.round(this.props.game.tempsTravail - nbUnite * tempsTravailPerUnit)

    const newEnv = iaeAdded
      ? Math.round(this.props.game.environnement + nbUnite * envPerUnit)
      : Math.round(this.props.game.environnement - nbUnite * envPerUnit)

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
  // Delete all iaes implemented in the tour
  clearAllIAEs () {
    // Update score by adding the points of the iaes deleted
    let newProduction = this.props.game.production
    let newTempsTravail = this.props.game.tempsTravail
    let newEnv = this.props.game.environnement

    const allIaes = this.state.iaeImplemented.concat(this.state.iaeMarkerImplemented)

    allIaes.forEach(iae => {
      const envPerUnit = mapLegend[iae.IAEGroup].environment
      const tempsTravailPerUnit = mapLegend[iae.IAEGroup].iaeList[iae.IAEType].workingTime
      const productionPerUnit = mapLegend[iae.IAEGroup].iaeList[iae.IAEType].production

      newProduction = Math.round(newProduction - iae.unity * productionPerUnit)
      newTempsTravail = Math.round(newTempsTravail - iae.unity * tempsTravailPerUnit)
      newEnv = Math.round(newEnv - iae.unity * envPerUnit)
    })

    this.props.tmpScore(newProduction, newEnv, this.props.game.ancrageSocial, newTempsTravail)

    // Clear iaes implemented
    this.setState({ iaeImplemented: [], iaeMarkerImplemented: [] })

    // Decorator marker are independent from iae polyline, so we have to delete them separately
    this.state.iaeImplemented.map(iae => this.setDecoratorMarkersToDelete(iae))
  }

  onChangeDeletingIAE (deletingIAE) { this.setState({ deletingIAE: deletingIAE }) }

  /**
   *
   * Deleting iae could be canceled, so we save the iaes to delete in the state (IAEtoDelete and IAEmarkerToDelete)
   *
   * We remove directly the iae to delete from iaes implemented in state,
   * If deleting is canceled, we add iaes to delete again on the map
   *
   */
  onDeleteIAE (e, iae) {
    // Check if we are in deleting mode
    if (this.state.deletingIAE) {
      if (iae.layerType === 'circlemarker') {
        const indexIaeToRemove = this.state.iaeMarkerImplemented.indexOf(iae)

        // We save the iae to delete in IAEmarkerToDelete and we remove it from iae implemented
        this.setState({
          IAEmarkerToDelete: this.state.IAEmarkerToDelete.concat(iae),
          iaeMarkerImplemented: this.state.iaeMarkerImplemented.filter((_, i) => i !== indexIaeToRemove)
        })
      } else {
        const indexIaeToRemove = this.state.iaeImplemented.indexOf(iae)

        // We save the iae to delete in IAEmarkerToDelete and we remove it from iae implemented
        this.setState({
          IAEtoDelete: this.state.IAEtoDelete.concat(iae),
          iaeImplemented: this.state.iaeImplemented.filter((_, i) => i !== indexIaeToRemove)
        })

        // Decorator marker are independent from iae polyline, so we have to delete them separately
        this.setDecoratorMarkersToDelete(iae)
      }

      // Update score by removing the points of the iae deleted
      this.updateScore(iae, false)
    }
  }

  // Get the markers used to decorate an iae in order to delete them
  setDecoratorMarkersToDelete (iae) {
    // Get all the markers present on the map
    let markers = []
    this.mapRef.current.leafletElement.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        markers = markers.concat(layer)
      }
    })

    // Only iae polylines contains decorator markers (not polygons)
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

  // Called when iae deleting is validate (when SAVE button is clicked)
  onValidateDeletingIAE () {
    /** iaes to delete are already removed from the iae implemented array
     * So we only need to clear arrays of deleting
     */
    this.setState({
      IAEtoDelete: [],
      decoratorMarkersToDelete: [],
      IAEmarkerToDelete: [],
      deletingIAE: false
    })
  }

  // Called when iae deleting is canceled (when CANCEL button is clicked)
  onCancelDeletingIAE () {
    // Add on the map the decorator markers removed
    this.state.decoratorMarkersToDelete.map(marker => this.mapRef.current.leafletElement.addLayer(marker))

    // Update score by adding the points removed
    this.state.IAEtoDelete.map(iae => this.updateScore(iae, true))
    this.state.IAEmarkerToDelete.map(iae => this.updateScore(iae, true))

    // Add on the map the iaes removed, clear toDelete arrays, remove deleting mode
    this.setState({
      iaeImplemented: this.state.iaeImplemented.concat(this.state.IAEtoDelete),
      iaeMarkerImplemented: this.state.iaeMarkerImplemented.concat(this.state.IAEmarkerToDelete),
      IAEtoDelete: [],
      decoratorMarkersToDelete: [],
      IAEmarkerToDelete: [],
      deletingIAE: false
    })
  }

  // Close message error modal
  onCloseError = () => {
    this.setState({
      errorPrairie: false,
      errorZero: false,
      errorTypesIAE: false,
      errorMare: false
    })
  }

  clearIAEsimplemented = () => { this.setState({ iaeImplemented: [], iaeMarkerImplemented: [] }) }

  getAllMapMarkers = () => {
    let markers = []
    this.mapRef.current.leafletElement.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        markers = markers.concat(layer)
      }
    })
    return markers
  }

  // When an iae is deleted, its decorator markers come back when dragging/zooming map.
  // So on moving on the map, we remove the markers of the iaes deleted
  removeMarkersIAEdeleted = () => {
    // Get all the markers present on the map
    const markers = this.getAllMapMarkers()

    const oldIaeImplemented = this.props.game.iaeImplemented ? this.props.game.iaeImplemented : []
    const oldIaeMarkerImplemented = this.props.game.circleIAEs ? this.props.game.circleIAEs : []

    const allIaeImplemented = this.state.iaeImplemented.concat(oldIaeImplemented)
    const allIaeMarkerImplemented = this.state.iaeMarkerImplemented.concat(oldIaeMarkerImplemented)

    // For each marker, we check if it is used to decorate an IAE, and we remove it if not
    markers.forEach(m => {
      let toRemove = true

      // Marker decorating polyline
      allIaeImplemented
        .filter(iae => iae.layerType === 'polyline')
        .forEach(iae => {
          const iaeBounds = L.latLngBounds(iae.coords[0], iae.coords[1])

          if (iaeBounds.contains(m._latlng)) {
            toRemove = false
          }
        })

      // Marker decorating polygon (label)
      toRemove &&
        allIaeImplemented
          .filter(iae => iae.layerType !== 'polyline')
          .forEach(iae => {
            const iaeBounds = L.latLngBounds(iae.coords).getCenter()

            if (iaeBounds.lat === m._latlng.lat && iaeBounds.lng === m._latlng.lng) {
              toRemove = false
            }
          })

      // Markers for fixed iae (label marker for bosquet and cross marker for mare)
      toRemove &&
        allIaeMarkerImplemented
          .forEach(iae => {
            if (iae.center.lat === m._latlng.lat && iae.center.lng === m._latlng.lng) {
              toRemove = false
            }
          })

      toRemove && this.mapRef.current.leafletElement.removeLayer(m)
    }
    )
  }

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

        removeMarkersIAEdeleted={this.removeMarkersIAEdeleted}
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
