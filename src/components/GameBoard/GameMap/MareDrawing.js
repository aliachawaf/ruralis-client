import React from 'react'
import PropTypes from 'prop-types'

import mapLegend from '../../../config/mapLegend'
import { Circle, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import cross from '../../../assets/mapLegend/mares/cross.png'
import { Header } from 'semantic-ui-react'

// IN METERS
const mareSize = 20

const MareDrawing = (props) => {
  const { iae, handleDeleteIAE } = props

  const mareWithCross = mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName === 'abreuvement animaux'

  return (

    <Circle
      color={mapLegend[iae.IAEGroup].color}
      center={iae.center}
      radius={mareSize}
      onClick={(e) => handleDeleteIAE(e, iae)}
    >
      {mareWithCross &&
        <Marker
          position={iae.center}
          icon={L.icon({ iconSize: [25, 25], iconUrl: cross })}
        />}
      <Tooltip direction='top'>
        <Header content={mapLegend[iae.IAEGroup].iaeGroup} />
        {mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName}
      </Tooltip>

    </Circle>
  )
}

MareDrawing.propTypes = {
  iae: PropTypes.object.isRequired,
  handleDeleteIAE: PropTypes.func
}

export default MareDrawing
