import React from 'react'
import PropTypes from 'prop-types'

import mapLegend from '../../../config/mapLegend'
import { Circle, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import cross from '../../../assets/mapLegend/mares/cross.png'
import { Header } from 'semantic-ui-react'

const CircleIaeDrawing = (props) => {
  const { iae, handleDeleteIAE } = props

  const withCross = mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName === 'abreuvement animaux'

  return ([
    <Circle
      key={iae.IAEGroup + '' + iae.IAEType}
      color={mapLegend[iae.IAEGroup].color}
      center={iae.center}
      radius={20}
      fill={false}
      onClick={(e) => handleDeleteIAE(e, iae)}
    >
      <Tooltip direction='top'>
        <Header content={mapLegend[iae.IAEGroup].iaeGroup} />
        {mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName}
      </Tooltip>
    </Circle>,
    withCross &&
      <Marker
        position={iae.center}
        icon={L.icon({ iconSize: [25, 25], iconUrl: cross })}
      />
  ])
}

CircleIaeDrawing.propTypes = {
  iae: PropTypes.object.isRequired,
  handleDeleteIAE: PropTypes.func.isRequired
}

export default CircleIaeDrawing
