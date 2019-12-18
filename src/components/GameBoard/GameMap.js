import React from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { FeatureGroup, ImageOverlay, Map } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import gameMap from '../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'
import PolylineDecorator from './PolylineDecorator'

import icon from '../../assets/mapLegend/circle.png'

const arrow = [
  {
    offset: '10%',
    repeat: '30px',
    symbol: L.Symbol.marker({
      rotate: true,
      markerOptions: {
        icon: L.icon({
          iconUrl: icon,
          iconAnchor: [8, 8]
        })
      }
    })
  }

]

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
          circlemarker: false
        }}
      />
    </FeatureGroup>

    {
      props.iaeImplemented.map((iae, index) =>

        <PolylineDecorator key={index} color={iae.color} patterns={arrow} positions={iae.positions} />

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
  iaeImplemented: PropTypes.array.isRequired
}

GameMap.defaultProps = {}

export default GameMap
