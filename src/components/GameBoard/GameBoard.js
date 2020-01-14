import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap'
import IAETypeSelect from './IAETypeSelect'
import StartGameModal from './StartGameModal'

import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'

import mapInfoLegend from '../../assets/mapInfoLegend.png'
import RuralisHeader from '../common/RuralisHeader'
import GameStepContainer from '../../containers/GameStep.container'

const GameBoard = React.forwardRef((props, ref) => {
  const {
    currentStep,
    idGame,
    bounds,
    handleCreatedIAE,
    iaeImplemented,
    circleIaeImplemented,
    iaeGroupSelected,
    iaeTypeSelected,
    handleIAETypeChange,
    numTour,
    gamePlayers,
    scenario,
    opened,
    handleStartGame,
    production,
    environnement,
    tempsTravail,
    ancrageSocial
  } = props

  return (
    <div>
      <RuralisHeader title={'Partie ' + idGame} />
      <Segment basic>

        {
          numTour === 0 &&
            <StartGameModal
              gamePlayers={gamePlayers}
              scenario={scenario}
              opened={opened}
              handleStartGame={handleStartGame}
            />
        }

        <Grid columns={3} stackable textAlign='center'>

          <Grid.Column width={9}>
            <GameMap
              ref={ref}
              bounds={bounds}
              onCreatedIAE={handleCreatedIAE}
              iaeGroupSelected={iaeGroupSelected}
              iaeImplemented={iaeImplemented}
              circleIaeImplemented={circleIaeImplemented}
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <Header content={'Choix de l\'IAE à implémenter'} />

            <IAETypeSelect
              iaeGroupSelected={iaeGroupSelected}
              iaeTypeSelected={iaeTypeSelected}
              onIAETypeChange={handleIAETypeChange}
            />

            <Divider hidden />

            <Image src={mapInfoLegend} />
          </Grid.Column>

          <Grid.Column width={4}>
            <GameStepContainer
              idGame={idGame}
              currentStep={currentStep}
              iaeImplemented={iaeImplemented}
              circleIaeImplemented={circleIaeImplemented}
              timerLaunched={!opened}
              production={production}
              tempsTravail={tempsTravail}
              ancrageSocial={ancrageSocial}
              environnement={environnement}
            />
          </Grid.Column>

        </Grid>
      </Segment>
    </div>
  )
})

GameBoard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  idGame: PropTypes.string.isRequired,
  numTour: PropTypes.number.isRequired,
  // GameMap
  bounds: PropTypes.array.isRequired,
  handleCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  circleIaeImplemented: PropTypes.array.isRequired,
  // IAE Type Select
  iaeGroupSelected: PropTypes.number.isRequired,
  iaeTypeSelected: PropTypes.number.isRequired,
  handleIAETypeChange: PropTypes.func.isRequired,
  // Game Step
  // Start Game Modal
  gamePlayers: PropTypes.array.isRequired,
  scenario: PropTypes.number.isRequired,
  opened: PropTypes.bool.isRequired,
  handleStartGame: PropTypes.func.isRequired,
  // SCORING
  production: PropTypes.number.isRequired,
  environnement: PropTypes.number.isRequired,
  tempsTravail: PropTypes.number.isRequired,
  ancrageSocial: PropTypes.number.isRequired
}

GameBoard.defaultProps = {
  numTour: 0,
  iaeImplemented: [],
  circleIaeImplemented: [],
  iaeGroupSelected: 0,
  iaeTypeSelected: 0
}

export default GameBoard
