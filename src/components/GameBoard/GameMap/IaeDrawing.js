import React from 'react'
import PropTypes from 'prop-types'

import mapLegend from '../../../config/mapLegend'
import { Tooltip } from 'react-leaflet'
import { Header, Statistic } from 'semantic-ui-react'
import PolylineDecorator from './PolylineDecorator'

const IaeDrawing = (props) => {
  const { iae } = props

  return (
    <PolylineDecorator
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
  )
}

IaeDrawing.propTypes = {
  iae: PropTypes.object.isRequired
}

export default IaeDrawing
