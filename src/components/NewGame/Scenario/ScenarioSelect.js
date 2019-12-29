import React from 'react'
import { Accordion, Container, Divider, Dropdown, Grid, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const panels = [
  {
    key: 'what-is-dog',
    title: 'What is a dog?'
  }
]

const options = [
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 }
]

const ScenarioSelect = (props) => {
  const { scenario, handleChangeScenario } = props

  return (
    <Segment placeholder>
      <Container>
        <Dropdown
          selection
          options={options}
          value={scenario}
          placeholder='Choisir un scénario'
          onChange={handleChangeScenario}
        />
      </Container>
      <Divider hidden />
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Accordion
                panels={panels}
                fluid
                styled
              />
            </Grid.Column>
            <Grid.Column>
              <Accordion
                panels={panels}
                exclusive={false}
                fluid
                styled
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
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
