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

  return (
    <Rectangle
      bounds={[
        [iae.center.lat - bosquetSize / 2, iae.center.lng - bosquetSize / 2],
        [iae.center.lat + bosquetSize / 2, iae.center.lng + bosquetSize / 2]
      ]}
      color={mapLegend[iae.IAEGroup].color}
      onClick={(e) => handleDeleteIAE(e, iae)}
    >
      <Tooltip direction='top'>
        <Header content={mapLegend[iae.IAEGroup].iaeGroup} />
        {mapLegend[iae.IAEGroup].iaeList[iae.IAEType].iaeName}
      </Tooltip>
      <Marker
        position={iae.center}
        icon={L.divIcon({ className: 'TO DO', html: 'TO DO' })}
      />
    </Rectangle>
  )
}

BosquetDrawing.propTypes = {
  iae: PropTypes.object.isRequired,
  handleDeleteIAE: PropTypes.func
}

export default BosquetDrawing
