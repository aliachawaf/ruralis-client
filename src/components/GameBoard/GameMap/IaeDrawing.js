import React from 'react'
import PropTypes from 'prop-types'

import mapLegend from '../../../config/mapLegend'
import { Marker, Tooltip } from 'react-leaflet'
import { Header, Statistic } from 'semantic-ui-react'
import PolylineDecorator from './PolylineDecorator'
import L from 'leaflet'
import './index.css'

const IaeDrawing = (props) => {
  const { iae, handleDeleteIAE } = props

  const iaeGroupInfos = mapLegend[iae.IAEGroup]
  const iaeTypeInfos = iaeGroupInfos.iaeList[iae.IAEType]

  return (
    <PolylineDecorator
      color={iaeGroupInfos.color}
      fill
      patterns={iaeTypeInfos.decorator}
      positions={iae.layerType === 'polyline' ? iae.coords : [iae.coords.concat(iae.coords[0])]}
      onClick={(e) => handleDeleteIAE(e, iae)}
    >

      <Tooltip direction='top'>
        <Header content={iaeGroupInfos.iaeGroup} />
        {iaeTypeInfos.iaeName}
        <br />
        <Statistic
          value={iae.unity}
          label='unité(s)'
          size='mini'
        />
      </Tooltip>

      {iae.layerType !== 'polyline' &&

        <Marker
          position={L.latLngBounds(iae.coords).getCenter()}
          icon={L.divIcon({ className: 'iaeLabel', html: iaeTypeInfos.label })}
        />}

    </PolylineDecorator>
  )
}

IaeDrawing.propTypes = {
  iae: PropTypes.object.isRequired,
  handleDeleteIAE: PropTypes.func
}

export default IaeDrawing
