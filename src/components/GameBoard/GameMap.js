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
    iaeTypeSelected
  } = props

  const iaeSelectedDrawingType = mapLegend[iaeTypeSelected.charAt(0)].drawingType

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
        iaeImplemented.map((iae, index) => {
          return iae.drawingType === 'circle'
            ? <Circle
              key={index}
              color={mapLegend[iae.id.charAt(0)].color}
              center={iae.center}
              radius={iae.radius}
              /> // eslint-disable-line
            : <PolylineDecorator
              key={index}
              color={mapLegend[iae.id.charAt(0)].color}
              patterns={mapLegend[iae.id.charAt(0)].iaeList[iae.id.charAt(1)].decorator}
              positions={iae.positions}
              /> // eslint-disable-line
        }
        )
      }
    </Map>
  )
})

GameMap.propTypes = {
  bounds: PropTypes.array.isRequired,
  onCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  iaeTypeSelected: PropTypes.string.isRequired
}

GameMap.defaultProps = {
  iaeImplemented: [],
  iaeTypeSelected: '00'
}

export default GameMap
