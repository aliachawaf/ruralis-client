import React from 'react'
import PropTypes from 'prop-types'

import 'leaflet-polylinedecorator'
import L from 'leaflet'
import { ImageOverlay, Map, ScaleControl } from 'react-leaflet'

import gameMap from '../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'
import { connect } from 'react-redux'
import IaeDrawing from '../GameBoard/GameMap/IaeDrawing'
import mapLegend from '../../config/mapLegend'
import BosquetDrawing from '../GameBoard/GameMap/BosquetDrawing'
import MareDrawing from '../GameBoard/GameMap/MareDrawing'
import Control from 'react-leaflet-control'
import { Button } from 'semantic-ui-react'

const GameMapHistory = React.forwardRef((props, ref) => {
  const {
    bounds,
    iaeAlreadyImplemented,
    circleIaeAlreadyImplemented
  } = props

  return (
    <Map
      ref={ref}
      style={{ height: '90vh' }}
      crs={L.CRS.Simple}
      minZoom={-5}
      zoomSnap={0}
      attributionControl={false}
    >

      {/* GAME MAP IMAGE */}
      <ImageOverlay
        url={gameMap}
        bounds={bounds}
      />

      {/* MAP SCALE */}
      <ScaleControl imperial={false} position='bottomright' />

      {/* BUTTON TO RECENTER MAP */}
      <Control position='topright'>
        <Button
          icon='expand' content='Recentrer' color='grey'
          onClick={() => ref.current.leafletElement.fitBounds(bounds)}
        />
      </Control>

      {/* IAE ALREADY IMPLEMENTED DRAWINGS */}
      {
        iaeAlreadyImplemented.map((iae, index) => <IaeDrawing key={index} iae={iae} />)
      }
      {
        circleIaeAlreadyImplemented
          .filter(iae => mapLegend[iae.IAEGroup].iaeGroup === 'Bosquet')
          .map((iae, index) => <BosquetDrawing key={index} iae={iae} />)
      }
      {
        circleIaeAlreadyImplemented
          .filter(iae => mapLegend[iae.IAEGroup].iaeGroup === 'Mares')
          .map((iae, index) => <MareDrawing key={index} iae={iae} />)
      }

    </Map>
  )
})

GameMapHistory.propTypes = {
  game: PropTypes.object.isRequired,
  bounds: PropTypes.array.isRequired,
  iaeAlreadyImplemented: PropTypes.array.isRequired,
  circleIaeAlreadyImplemented: PropTypes.array.isRequired
}

GameMapHistory.defaultProps = {
  iaeAlreadyImplemented: [],
  circleIaeAlreadyImplemented: []
}

const mapStateToProps = state => ({
  game: state.game,
  iaeAlreadyImplemented: state.game.implementedIAE,
  circleIaeAlreadyImplemented: state.game.circleIAEs
})

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(GameMapHistory)
