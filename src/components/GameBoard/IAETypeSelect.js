import React from 'react'
import PropTypes from 'prop-types'
import { mapLegend } from '../../config/mapLegend'

const IAETypeSelect = (props) => (

  <select value={props.iaeTypeSelected} onChange={props.onIAETypeChange}>
    {
      mapLegend.map((iae, index) =>
        <option key={index} value={index}>{iae.iaeGroup + ' ' + iae.iaeName}</option>
      )
    }
  </select>
)

IAETypeSelect.propTypes = {
  iaeTypeSelected: PropTypes.string.isRequired,
  onIAETypeChange: PropTypes.func.isRequired
}

IAETypeSelect.defaultProps = {
  iaeTypeSelected: 0
}

export default IAETypeSelect
