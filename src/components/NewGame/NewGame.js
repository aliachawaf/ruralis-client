import React from 'react'
import RuralisHeader from '../common/RuralisHeader'
import { Button, Container, Divider, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import PlayersSelect from './Players/PlayersSelect'
import ScenarioSelect from './Scenario/ScenarioSelect'

const NewGame = (props) => {
  const {
    handleOnClick,
    handleOnChangeNbPlayers,
    nbPlayers,
    handleOnClickPlayer,
    playersSelected,
    scenario,
    handleChangeScenario
  } = props

  return (
    <div>
      <RuralisHeader title='Nouvelle Partie' />

      <Container>
        <Header as='h3' icon='users' content='Choix des joueurs' dividing />
        <PlayersSelect
          handleOnChangeNbPlayers={handleOnChangeNbPlayers}
          nbPlayers={nbPlayers}
          handleOnClickPlayer={handleOnClickPlayer}
          playersSelected={playersSelected}
        />
      </Container>

      <Divider hidden />

      <Container>
        <Header as='h3' icon='file text' content='Choix du scénario' dividing />
        <ScenarioSelect handleChangeScenario={handleChangeScenario} scenario={scenario} />
      </Container>

      <Divider hidden />

      <Container>
        <Button floated='right' content='Lancer nouvelle partie' onClick={handleOnClick} />
      </Container>
    </div>
  )
}

NewGame.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  handleOnChangeNbPlayers: PropTypes.func.isRequired,
  nbPlayers: PropTypes.number.isRequired,
  handleOnClickPlayer: PropTypes.func.isRequired,
  playersSelected: PropTypes.array.isRequired,
  scenario: PropTypes.number.isRequired,
  handleChangeScenario: PropTypes.func.isRequired
}

export default NewGame
