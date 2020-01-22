import React from 'react'
import { connect } from 'react-redux'
import GameBoard from '../components/GameBoard/GameBoard'
import PropTypes from 'prop-types'

import mapLegend from '../config/mapLegend'

import { fetchGame, startGame, tmpScore } from '../actions/gameActions'

const bounds = [[0, 0], [3330, 3825]]

class GameBoardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openedStartGameModal: true,
      iaeImplemented: [],
      circleIaeImplemented: [],
      iaeGroupSelected: 0,
      iaeTypeSelected: 0,
      actionSelected: -1,
      deletingIAE: false,
      IAEtoDelete: [],
      circleIAEtoDelete: []
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

    if (e.layerType === 'circlemarker') {
      const newIAE = {
        IAEGroup: this.state.iaeGroupSelected,
        IAEType: this.state.iaeTypeSelected,
        center: e.layer._latlng,
        unity: 1,
        layerType: e.layerType
      }

      this.setState({
        circleIaeImplemented: this.state.circleIaeImplemented.concat(newIAE)
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

      this.setState({
        iaeImplemented: this.state.iaeImplemented.concat(newIAE)
      })
      this.updateScore(newIAE)
    }
  }

  updateScore (newIAE) {
    const nbUnite = newIAE.unity

    const envPerUnit = mapLegend[newIAE.IAEGroup].environment
    const tempsTravailPerUnit = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].workingTime
    const productionPerUnit = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].production

    const newProduction = Math.round((this.props.game.production + (nbUnite * productionPerUnit)) * 10) / 10
    const newTempsTravail = Math.round((this.props.game.tempsTravail + (nbUnite * tempsTravailPerUnit)) * 10) / 10
    const newEnv = Math.round((this.props.game.environnement + (nbUnite * envPerUnit)) * 10) / 10

    this.props.tmpScore(newProduction, newEnv, this.props.game.ancrageSocial, newTempsTravail)
  }

  calculNbUnite (iaeCoords) {
    if (iaeCoords.length === 2) {
      const unity = (this.mapRef.current.leafletElement.distance(iaeCoords[0], iaeCoords[1]) / 150)
      return Math.round(unity * 10) / 10
    } else {
      const arr = iaeCoords[0]
      const X = []
      const Y = []
      arr.forEach(coord => { X.push(coord.lng); Y.push(coord.lat) })
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

  clearAllIAEs () {
    this.setState({ iaeImplemented: [], circleIaeImplemented: [] })
  }

  onChangeDeletingIAE (deletingIAE) { this.setState({ deletingIAE: deletingIAE }) }

  onDeleteIAE (e, iae) {
    if (this.state.deletingIAE) {
      if (iae.layerType === 'circlemarker') {
        const indexIaeToRemove = this.state.circleIaeImplemented.indexOf(iae)

        this.setState({
          circleIAEtoDelete: this.state.circleIAEtoDelete.concat(iae),
          circleIaeImplemented: this.state.circleIaeImplemented.filter((_, i) => i !== indexIaeToRemove)
        })
      } else {
        const indexIaeToRemove = this.state.iaeImplemented.indexOf(iae)

        this.setState({
          IAEtoDelete: this.state.IAEtoDelete.concat(iae),
          iaeImplemented: this.state.iaeImplemented.filter((_, i) => i !== indexIaeToRemove)
        })
      }
    }
  }

  onValidateDeletingIAE () {
    this.setState({
      IAEtoDelete: [],
      circleIAEtoDelete: []
    })

    this.onChangeDeletingIAE(false)
  }

  onCancelDeletingIAE () {
    this.setState({
      iaeImplemented: this.state.iaeImplemented.concat(this.state.IAEtoDelete),
      circleIaeImplemented: this.state.circleIaeImplemented.concat(this.state.circleIAEtoDelete),
      IAEtoDelete: [],
      circleIAEtoDelete: []
    })

    this.onChangeDeletingIAE(false)
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
        circleIaeImplemented={this.state.circleIaeImplemented}
        clearAllIAEs={this.clearAllIAEs}
        iaeGroupSelected={this.state.iaeGroupSelected}
        iaeTypeSelected={this.state.iaeTypeSelected}
        actionSelected={this.state.actionSelected}
        handleOnChangeAction={this.onChangeAction}

        handleonChangeDeleting={this.onChangeDeletingIAE}
        handleDeleteIAE={this.onDeleteIAE}
        handleValidateDeletingIAE={this.onValidateDeletingIAE}
        handleCancelDeletingIAE={this.onCancelDeletingIAE}
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
