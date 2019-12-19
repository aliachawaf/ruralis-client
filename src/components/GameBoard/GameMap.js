import React from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { Circle, FeatureGroup, ImageOverlay, Map } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import gameMap from '../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'
import PolylineDecorator from './PolylineDecorator'

import { mapLegend } from '../../config/mapLegend'

const GameMap = React.forwardRef((props, ref) => (
  <Map
    ref={ref}
    style={{ height: '90vh', width: '55vw' }}
    crs={L.CRS.Simple}
    attributionControl={false}
    dragging={false}
  >

    <ImageOverlay
      url={gameMap}
      bounds={props.bounds}
    />

    <FeatureGroup>
      <EditControl
        position='topright'
        onCreated={e => props.onCreatedIAE(e)}
        draw={{
          marker: false,
          circlemarker: false,
          polyline: (mapLegend[props.iaeTypeSelected].drawingType === 'polyline'),
          polygon: (mapLegend[props.iaeTypeSelected].drawingType === 'polygon'),
          rectangle: (mapLegend[props.iaeTypeSelected].drawingType === 'polygon'),
          circle: (mapLegend[props.iaeTypeSelected].drawingType === 'circle')
        }}
      />
    </FeatureGroup>

    {
      props.iaeImplemented.map((iae, index) => {
        return iae.drawingType === 'circle'
          ? <Circle key={index} color={mapLegend[iae.id].color} center={iae.center} radius={iae.radius} />
          : <PolylineDecorator key={index} color={mapLegend[iae.id].color} patterns={mapLegend[iae.id].decorator} positions={iae.positions} />
      }
      )
    }
  </Map>
))

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
