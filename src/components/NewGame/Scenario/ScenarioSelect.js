import React from 'react'
import { Divider, Dropdown, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ListScenarii from './ListScenarii'

import scenarii from '../../../config/scenarii'

const ScenarioSelect = (props) => {
  const { scenario, handleChangeScenario } = props

  return (
    <Segment placeholder padded>
      <Dropdown
        selection
        options={scenarii.map(s => ({ key: s.number, text: 'Scénario ' + s.number + ' : ' + s.name, value: s.number }))}
        value={scenario}
        placeholder='Choisir un scénario'
        onChange={handleChangeScenario}
      />

      <Divider hidden />

      <ListScenarii />
    </Segment>
  )
}

ScenarioSelect.propTypes = {
  scenario: PropTypes.number.isRequired,
  handleChangeScenario: PropTypes.func.isRequired
}

ScenarioSelect.defaultProps = {
  nbPlayers: 5,
  playersSelected: []
}

export default ScenarioSelect
