import React from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { Circle, FeatureGroup, ImageOverlay, Map } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import gameMap from '../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'
import PolylineDecorator from './PolylineDecorator'

import mapLegend from '../../config/mapLegend'

const GameMap = React.forwardRef((props, ref) => {
  const {
    bounds,
    onCreatedIAE,
    iaeImplemented,
    circleIaeImplemented,
    iaeGroupSelected
  } = props

  const iaeSelectedDrawingType = mapLegend[iaeGroupSelected].drawingType

  return (
    <Map
      ref={ref}
      style={{ height: '90vh', width: '55vw' }}
      crs={L.CRS.Simple}
      minZoom={-5}
      attributionControl={false}
      dragging={false}
    >

      {/* GAME MAP IMAGE */}
      <ImageOverlay
        url={gameMap}
        bounds={bounds}
      />

      {/* DRAWING TOOLTIP */}
      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={e => onCreatedIAE(e)}
          draw={{
            marker: false,
            circlemarker: true,
            polyline: (iaeSelectedDrawingType === 'polyline'),
            polygon: (iaeSelectedDrawingType === 'polygon'),
            rectangle: (iaeSelectedDrawingType === 'polygon'),
            circle: (iaeSelectedDrawingType === 'circle')
          }}
        />
      </FeatureGroup>

      {/* IAE IMPLEMENTED DRAWINGS */}
      {
        iaeImplemented.map((iae, index) => (
          <PolylineDecorator
            key={index}
            color={mapLegend[iae.IAEGroup].color}
            patterns={mapLegend[iae.IAEGroup].iaeList[iae.IAEType].decorator}
            positions={iae.coords}
          />
        ))
      }

      {
        circleIaeImplemented.map((iae, index) => (
          <Circle
            key={index}
            color={mapLegend[iae.IAEGroup].color}
            center={iae.center}
            radius={iae.radius}
          />
        )
        )
      }
    </Map>
  )
})

GameMap.propTypes = {
  bounds: PropTypes.array.isRequired,
  onCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  circleIaeImplemented: PropTypes.array.isRequired,
  iaeGroupSelected: PropTypes.number.isRequired
}

GameMap.defaultProps = {
  iaeImplemented: [],
  circleIaeImplemented: [],
  iaeGroupSelected: 0
}

export default GameMap
