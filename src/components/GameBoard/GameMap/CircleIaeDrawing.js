import React from 'react'
import PropTypes from 'prop-types'

import mapLegend from '../../../config/mapLegend'
import { CircleMarker, Marker } from 'react-leaflet'
import L from 'leaflet'
import cross from '../../../assets/mapLegend/mares/cross.png'

const CircleIaeDrawing = (props) => {
  const { iae } = props

  const withCross = mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName === 'abreuvement animaux'

  return ([
    <CircleMarker
      key={iae.IAEGroup + '' + iae.IAEType}
      color={mapLegend[iae.IAEGroup].color}
      center={iae.center}
      weight={2}
      fill={false}
    />,
    withCross &&
      <Marker
        position={iae.center}
        icon={L.icon({ iconSize: [25, 25], iconUrl: cross })}
      />
  ])
}

CircleIaeDrawing.propTypes = {
  iae: PropTypes.object.isRequired
}

export default CircleIaeDrawing
