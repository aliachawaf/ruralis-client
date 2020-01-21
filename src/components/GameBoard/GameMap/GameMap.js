import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { FeatureGroup, ImageOverlay, Map, ScaleControl } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import gameMap from '../../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'

import mapLegend from '../../../config/mapLegend'
import { connect } from 'react-redux'
import IaeDrawing from './IaeDrawing'
import CircleIaeDrawing from './CircleIaeDrawing'
import Control from 'react-leaflet-control'
import { Button } from 'semantic-ui-react'

const GameMap = React.forwardRef((props, ref) => {
  const {
    bounds,
    onCreatedIAE,
    iaeImplemented,
    circleIaeImplemented,
    iaeGroupSelected,
    iaeAlreadyImplemented,
    circleIaeAlreadyImplemented,
    clearAllIAEs
  } = props

  const iaeSelectedDrawingType = mapLegend[iaeGroupSelected].drawingType

  return (
    <Map
      ref={ref}
      style={{ height: '90vh', width: '55vw' }}
      crs={L.CRS.Simple}
      minZoom={-5}
      attributionControl={false}
    >

      {/* GAME MAP IMAGE */}
      <ImageOverlay
        url={gameMap}
        bounds={bounds}
      />

      {/* MAP SCALE */}
      <ScaleControl imperial={false} position='bottomright' />

      {/* BUTTON TO CLEAR ALL IAE DRAWINGS */}
      {
        props.game.step === 1 &&
          <Control position='topright'>
            <Button
              icon='trash alternate outline' content='Tout Effacer' color='grey'
              onClick={clearAllIAEs}
            />
          </Control>
      }

      {/* DRAWING TOOLTIP */}
      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={e => {
            onCreatedIAE(e)
          }}
          draw={{
            marker: false,
            circle: false,
            polyline: (iaeSelectedDrawingType === 'polyline'),
            polygon: (iaeSelectedDrawingType === 'polygon'),
            rectangle: (iaeSelectedDrawingType === 'polygon'),
            circlemarker: (iaeSelectedDrawingType === 'circlemarker')
          }}
        />
      </FeatureGroup>

      {/* IAE ALREADY IMPLEMENTED DRAWINGS */}
      {
        iaeAlreadyImplemented.map((iae, index) => <IaeDrawing key={index} iae={iae} />)
      }
      {
        circleIaeAlreadyImplemented.map((iae, index) => <CircleIaeDrawing key={index} iae={iae} />)
      }

      {/* NEW IAE IMPLEMENTED DRAWINGS */}
      {
        iaeImplemented.map((iae, index) => <IaeDrawing key={index} iae={iae} />)
      }
      {
        circleIaeImplemented.map((iae, index) => <CircleIaeDrawing key={index} iae={iae} />)
      }

    </Map>
  )
})

GameMap.propTypes = {
  game: PropTypes.object.isRequired,
  bounds: PropTypes.array.isRequired,
  onCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  circleIaeImplemented: PropTypes.array.isRequired,
  iaeGroupSelected: PropTypes.number.isRequired,
  iaeAlreadyImplemented: PropTypes.array.isRequired,
  circleIaeAlreadyImplemented: PropTypes.array.isRequired,
  clearAllIAEs: PropTypes.func.isRequired
}

GameMap.defaultProps = {
  iaeImplemented: [],
  circleIaeImplemented: [],
  iaeGroupSelected: 0,
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
)(GameMap)
