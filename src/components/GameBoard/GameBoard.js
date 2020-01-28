import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap/GameMap'
import IAETypeSelect from './IAETypeSelect'
import StartGameModal from './StartGameModal'
import { connect } from 'react-redux'

import { Divider, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import mapInfoLegend from '../../assets/mapLegend/mapInfoLegend.png'
import RuralisHeader from '../common/RuralisHeader'
import GameStepContainer from '../../containers/GameStep.container'
import scenarii from '../../config/scenarii'

const GameBoard = React.forwardRef((props, ref) => {
  const {
    game,
    bounds,
    handleCreatedIAE,
    iaeImplemented,
    circleIaeImplemented,
    clearAllIAEs,
    handleonChangeDeleting,
    handleDeleteIAE,
    handleValidateDeletingIAE,
    handleCancelDeletingIAE,
    iaeGroupSelected,
    iaeTypeSelected,
    handleIAETypeChange,
    actionSelected,
    handleOnChangeAction,
    opened,
    handleStartGame
  } = props

  const breadcrumbSections = [
    { key: game._id, content: 'Partie ' + game._id, active: true, as: 'h3' }
  ]

  const scenarioInfos = scenarii.find(s => s.number === game.scenario)

  return (
    <div>
      <RuralisHeader breadcrumbSections={breadcrumbSections} />
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
              clearAllIAEs={clearAllIAEs}
              handleDeleteIAE={handleDeleteIAE}
              handleonChangeDeleting={handleonChangeDeleting}
              handleValidateDeletingIAE={handleValidateDeletingIAE}
              handleCancelDeletingIAE={handleCancelDeletingIAE}
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
            <Message color='yellow' header='OBJECTIFS' content={scenarioInfos && scenarioInfos.objectives} />

            <Image src={mapInfoLegend} />
          </Grid.Column>

          <Grid.Column width={4}>
            <GameStepContainer
              iaeImplemented={iaeImplemented}
              circleIaeImplemented={circleIaeImplemented}
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
  clearAllIAEs: PropTypes.func.isRequired,
  handleonChangeDeleting: PropTypes.func.isRequired,
  handleDeleteIAE: PropTypes.func.isRequired,
  handleValidateDeletingIAE: PropTypes.func.isRequired,
  handleCancelDeletingIAE: PropTypes.func.isRequired,
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
