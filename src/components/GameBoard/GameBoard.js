import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap'
import IAETypeSelect from './IAETypeSelect'
import GameStep from './GameStep'
import StartGameModal from './StartGameModal'

const GameBoard = React.forwardRef((props, ref) => {
  const {
    bounds,
    handleCreatedIAE,
    iaeImplemented,
    iaeTypeSelected,
    handleIAETypeChange,
    handleValidateIAEs,
    players,
    opened,
    handleStartGame
  } = props

  return (
    <div>
      <StartGameModal
        players={players}
        opened={opened}
        handleStartGame={handleStartGame}
      />

      <GameMap
        ref={ref}
        bounds={bounds}
        onCreatedIAE={handleCreatedIAE}
        iaeTypeSelected={iaeTypeSelected}
        iaeImplemented={iaeImplemented}
      />

      <IAETypeSelect
        iaeTypeSelected={iaeTypeSelected}
        onIAETypeChange={handleIAETypeChange}
      />

      <GameStep onValidateIAEs={handleValidateIAEs} />
    </div>
  )
})

GameBoard.propTypes = {
  // GameMap
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  bounds: PropTypes.array.isRequired,
  handleCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  // IAE Type Select
  iaeTypeSelected: PropTypes.string.isRequired,
  handleIAETypeChange: PropTypes.func.isRequired,
  // Game Step
  handleValidateIAEs: PropTypes.func.isRequired,
  // Start Game Modal
  players: PropTypes.array.isRequired,
  opened: PropTypes.bool.isRequired,
  handleStartGame: PropTypes.func.isRequired
}

GameBoard.defaultProps = {}

export default GameBoard
