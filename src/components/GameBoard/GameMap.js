import React from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'
import { CircleMarker, FeatureGroup, ImageOverlay, Map, Marker, Tooltip } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import { Header, Statistic } from 'semantic-ui-react'

import gameMap from '../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'
import PolylineDecorator from './PolylineDecorator'

import mapLegend from '../../config/mapLegend'
import cross from '../../assets/mapLegend/mares/cross.png'

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
            <Tooltip direction='top'>
              <Header content={mapLegend[iae.IAEGroup].iaeGroup} />
              {mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName}
              <br />
              <Statistic
                value={iae.unity}
                label='unité(s)'
                size='mini'
              />
            </Tooltip>
          </PolylineDecorator>
        ))
      }

      {
        circleIaeImplemented.map((iae, index) => {
          const withCross = mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName === 'abreuvement animaux'

          return ([
            <CircleMarker
              key={index}
              color={mapLegend[iae.IAEGroup].color}
              center={iae.center}
              weight={2}
              fill={false}
            />,
            withCross &&
              <Marker
                position={iae.center}
                icon={L.icon({ iconSize: [25, 25], iconUrl: cross })}
              />]
          )
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
  circleIaeImplemented: PropTypes.array.isRequired,
  iaeGroupSelected: PropTypes.number.isRequired
}

GameMap.defaultProps = {
  iaeImplemented: [],
  circleIaeImplemented: [],
  iaeGroupSelected: 0
}

export default GameMap
