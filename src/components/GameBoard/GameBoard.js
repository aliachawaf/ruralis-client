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
    gameId,
    bounds,
    handleCreatedIAE,
    iaeImplemented,
    iaeTypeSelected,
    handleIAETypeChange,
    gamePlayers,
    scenario,
    opened,
    handleStartGame
  } = props

  return (
    <div>
      <RuralisHeader title={'Partie ' + gameId} />
      <Segment basic>
        <StartGameModal
          gamePlayers={gamePlayers}
          scenario={scenario}
          opened={opened}
          handleStartGame={handleStartGame}
        />

        <Grid columns={3} stackable textAlign='center'>

          <Grid.Column width={9}>
            <GameMap
              ref={ref}
              bounds={bounds}
              onCreatedIAE={handleCreatedIAE}
              iaeTypeSelected={iaeTypeSelected}
              onIAETypeChange={handleIAETypeChange}
              iaeImplemented={iaeImplemented}
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <Header content={'Choix de l\'IAE à implémenter'} />

            <IAETypeSelect
              iaeTypeSelected={iaeTypeSelected}
              onIAETypeChange={handleIAETypeChange}
            />

            <Divider hidden />

            <Image src={mapInfoLegend} />
          </Grid.Column>

          <Grid.Column width={4}>
            <GameStepContainer
              currentStep={currentStep}
              iaeImplemented={iaeImplemented}
            />
          </Grid.Column>

        </Grid>
      </Segment>
    </div>
  )
})

GameBoard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  // GameMap
  bounds: PropTypes.array.isRequired,
  handleCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  // IAE Type Select
  iaeTypeSelected: PropTypes.string.isRequired,
  handleIAETypeChange: PropTypes.func.isRequired,
  // Game Step
  // Start Game Modal
  gamePlayers: PropTypes.array.isRequired,
  scenario: PropTypes.number.isRequired,
  opened: PropTypes.bool.isRequired,
  handleStartGame: PropTypes.func.isRequired
}

GameBoard.defaultProps = {
  iaeImplemented: [],
  iaeTypeSelected: '00'
}

export default GameBoard
