import React from 'react'
import RuralisHeader from '../common/RuralisHeader'
import { Button, Container, Dropdown, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const options = [
  { key: 1, text: 1, value: 1 },
  { key: 2, text: 2, value: 2 }
]

const NewGame = (props) => {
  const { handleOnClick, handleOnChangePlayers, nbPlayers, scenario, handleChangeScenario } = props

  return (
    <div>
      <RuralisHeader title='Nouvelle Partie' />

      <Container>
        <Input
          icon='users'
          iconPosition='left'
          type='number'
          min={5}
          max={7}
          value={nbPlayers}
          onChange={handleOnChangePlayers}
        />
      </Container>
      <Container>
        <Dropdown
          selection
          options={options}
          value={scenario}
          placeholder='Choisir un scénario'
          onChange={handleChangeScenario}
        />
      </Container>
      <Container>

        <Button content='Lancer nouvelle partie' onClick={handleOnClick} />
      </Container>
    </div>
  )
}

NewGame.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  handleOnChangePlayers: PropTypes.func.isRequired,
  nbPlayers: PropTypes.number.isRequired,
  scenario: PropTypes.number.isRequired,
  handleChangeScenario: PropTypes.func.isRequired
}

export default NewGame
