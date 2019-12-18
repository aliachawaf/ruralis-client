import React from 'react'
import PropTypes from 'prop-types'

const iaeTypes = [
  { key: 1, text: 'Rouge', value: 'red' },
  { key: 2, text: 'Bleu', value: 'blue' },
  { key: 3, text: 'Vert', value: 'green' }
]

const IAETypeSelect = (props) => (

  <select value={props.iaeTypeSelected} onChange={props.handleIAETypeChange}>
    {
      iaeTypes.map(iaeType =>
        <option key={iaeType.key} value={iaeType.value}>{iaeType.text}</option>
      )
    }
  </select>
)

IAETypeSelect.propTypes = {
  iaeTypeSelected: PropTypes.string.isRequired,
  handleIAETypeChange: PropTypes.func.isRequired
}

IAETypeSelect.defaultProps = {}

export default IAETypeSelect
