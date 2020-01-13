import React from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { CircleMarker, FeatureGroup, ImageOverlay, Map, Popup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import { Header } from 'semantic-ui-react'

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
            circle: false,
            polyline: (iaeSelectedDrawingType === 'polyline'),
            polygon: (iaeSelectedDrawingType === 'polygon'),
            rectangle: (iaeSelectedDrawingType === 'polygon'),
            circlemarker: (iaeSelectedDrawingType === 'circlemarker')
          }}
        />
      </FeatureGroup>

      {/* IAE IMPLEMENTED DRAWINGS */}
      {
        iaeImplemented.map((iae, index) => (
          <PolylineDecorator
            key={index}
            color={mapLegend[iae.IAEGroup].color}
            fill
            patterns={mapLegend[iae.IAEGroup].iaeList[iae.IAEType].decorator}
            positions={iae.coords}
          >
            <Popup>
              <Header content={mapLegend[iae.IAEGroup].iaeGroup} />
              {mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName}
            </Popup>
          </PolylineDecorator>
        ))
      }

      {
        circleIaeImplemented.map((iae, index) => (
          <CircleMarker
            key={index}
            color={mapLegend[iae.IAEGroup].color}
            center={iae.center}
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
