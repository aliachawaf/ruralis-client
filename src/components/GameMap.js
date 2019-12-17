import React from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { FeatureGroup, ImageOverlay, Map } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import gameMap from '../assets/gameMap.png'
import '../../node_modules/leaflet-draw/dist/leaflet.draw.css'

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
        onCreated={e => props.handleCreatedIAE(e)}
        draw={{
          marker: false,
          circlemarker: false
        }}
      />
    </FeatureGroup>

  </Map>
))

GameMap.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  bounds: PropTypes.array.isRequired,
  handleCreatedIAE: PropTypes.func.isRequired
}

GameMap.defaultProps = {}

export default GameMap
