import React from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { Circle, FeatureGroup, ImageOverlay, Map } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import gameMap from '../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'
import PolylineDecorator from './PolylineDecorator'

import { mapLegend } from '../../config/mapLegend'

const GameMap = React.forwardRef((props, ref) => {
  const { bounds, onCreatedIAE, iaeImplemented, iaeTypeSelected } = props

  return (
    <Map
      ref={ref}
      style={{ height: '90vh', width: '55vw' }}
      crs={L.CRS.Simple}
      attributionControl={false}
      dragging={false}
    >

      <ImageOverlay
        url={gameMap}
        bounds={bounds}
      />

      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={e => onCreatedIAE(e)}
          draw={{
            marker: false,
            circlemarker: false,
            polyline: (mapLegend[iaeTypeSelected].drawingType === 'polyline'),
            polygon: (mapLegend[iaeTypeSelected].drawingType === 'polygon'),
            rectangle: (mapLegend[iaeTypeSelected].drawingType === 'polygon'),
            circle: (mapLegend[iaeTypeSelected].drawingType === 'circle')
          }}
        />
      </FeatureGroup>

      {
        iaeImplemented.map((iae, index) => {
          return iae.drawingType === 'circle'
            ? <Circle
              key={index}
              color={mapLegend[iae.id].color}
              center={iae.center}
              radius={iae.radius}
              /> // eslint-disable-line
            : <PolylineDecorator
              key={index}
              color={mapLegend[iae.id].color}
              patterns={mapLegend[iae.id].decorator}
              positions={iae.positions}
              /> // eslint-disable-line
        }
        )
      }
    </Map>
  )
})

GameMap.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  bounds: PropTypes.array.isRequired,
  onCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  iaeTypeSelected: PropTypes.string.isRequired
}

GameMap.defaultProps = {
  iaeImplemented: []
}

export default GameMap
