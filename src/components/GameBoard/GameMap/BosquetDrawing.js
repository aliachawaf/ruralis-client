import React from 'react'
import PropTypes from 'prop-types'

import mapLegend from '../../../config/mapLegend'
import { Marker, Rectangle, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { Header } from 'semantic-ui-react'

// IN METERS
const bosquetSize = 66

const BosquetDrawing = (props) => {
  const { iae, handleDeleteIAE } = props

  const iaeGroupInfos = mapLegend[iae.IAEGroup]
  const iaeTypeInfos = iaeGroupInfos.iaeList[iae.IAEType]

  return (
    <Rectangle
      bounds={[
        [iae.center.lat - bosquetSize / 2, iae.center.lng - bosquetSize / 2],
        [iae.center.lat + bosquetSize / 2, iae.center.lng + bosquetSize / 2]
      ]}
      color={iaeGroupInfos.color}
      onClick={(e) => handleDeleteIAE(e, iae)}
    >

      <Tooltip direction='top'>
        <Header content={iaeGroupInfos.iaeGroup} />
        {iaeTypeInfos.iaeName}
      </Tooltip>

      <Marker
        position={iae.center}
        icon={L.divIcon({ className: 'iaeLabel', html: iaeTypeInfos.label, iconAnchor: [-7, 0] })}
      />

    </Rectangle>
  )
}

BosquetDrawing.propTypes = {
  iae: PropTypes.object.isRequired,
  handleDeleteIAE: PropTypes.func
}

export default BosquetDrawing
