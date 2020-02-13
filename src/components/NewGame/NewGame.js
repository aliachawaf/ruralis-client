import React from 'react'
import RuralisHeader from '../common/RuralisHeader'
import { Button, Container, Divider, Header, Input, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import PlayersSelect from './Players/PlayersSelect'
import ScenarioSelect from './Scenario/ScenarioSelect'

const breadcrumbSections = [
  { key: 'newGame', content: 'Nouvelle Partie', active: true, as: 'h3' }
]

const NewGame = (props) => {
  const {
    handleOnClick,
    gameName,
    handleOnChangeName,
    handleOnChangeNbPlayers,
    nbPlayers,
    handleOnClickPlayer,
    playersSelected,
    scenario,
    handleChangeScenario,
    error
  } = props

  return (
    <div>
      <RuralisHeader breadcrumbSections={breadcrumbSections} />

      <Container>
        <Input label='Nom de la partie' type='text' value={gameName} onChange={handleOnChangeName} size='large' />
      </Container>

      <Divider hidden />

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
        {
          error &&
            <Message
              negative
              icon='warning sign'
              header={'Veuillez saisir un nom de partie et sélectionner vos ' + nbPlayers + ' joueurs et choisir un scénario pour pouvoir lancer la partie.'}
            />
        }
        <Button color='red' floated='right' content='Lancer nouvelle partie' onClick={handleOnClick} />
      </Container>
    </div>
  )
}

NewGame.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  handleOnChangeNbPlayers: PropTypes.func.isRequired,
  gameName: PropTypes.string.isRequired,
  handleOnChangeName: PropTypes.func.isRequired,
  nbPlayers: PropTypes.number.isRequired,
  handleOnClickPlayer: PropTypes.func.isRequired,
  playersSelected: PropTypes.array.isRequired,
  scenario: PropTypes.number.isRequired,
  handleChangeScenario: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
}

export default NewGame
