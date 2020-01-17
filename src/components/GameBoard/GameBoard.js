import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap'
import IAETypeSelect from './IAETypeSelect'
import StartGameModal from './StartGameModal'
import { connect } from 'react-redux'

import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'

import mapInfoLegend from '../../assets/mapInfoLegend.png'
import RuralisHeader from '../common/RuralisHeader'
import GameStepContainer from '../../containers/GameStep.container'

const GameBoard = React.forwardRef((props, ref) => {
  const {
    game,
    bounds,
    handleCreatedIAE,
    iaeImplemented,
    circleIaeImplemented,
    iaeGroupSelected,
    iaeTypeSelected,
    handleIAETypeChange,
    actionSelected,
    handleOnChangeAction,
    opened,
    handleStartGame
  } = props

  return (
    <div>
      <RuralisHeader title={'Partie ' + game._id} />
      <Segment basic>

        {
          game.numTour === 0 &&
            <StartGameModal
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
              iaeImplemented={iaeImplemented}
              circleIaeImplemented={circleIaeImplemented}
              timerLaunched={!opened}
              actionSelected={actionSelected}
              onChangeAction={handleOnChangeAction}
            />
          </Grid.Column>

        </Grid>
      </Segment>
    </div>
  )
})

GameBoard.propTypes = {
  game: PropTypes.object.isRequired,
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
  actionSelected: PropTypes.number.isRequired,
  handleOnChangeAction: PropTypes.func.isRequired,
  // Start Game Modal
  opened: PropTypes.bool.isRequired,
  handleStartGame: PropTypes.func.isRequired
}

GameBoard.defaultProps = {
  iaeImplemented: [],
  circleIaeImplemented: [],
  iaeGroupSelected: 0,
  iaeTypeSelected: 0
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(GameBoard)
