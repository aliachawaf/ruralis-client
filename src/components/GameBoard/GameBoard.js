import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap'
import IAETypeSelect from './IAETypeSelect'
import GameStep from './GameStep'

const GameBoard = React.forwardRef((props, ref) => (

  <div>
    <GameMap
      ref={ref}
      bounds={props.bounds}
      onCreatedIAE={props.handleCreatedIAE}
      iaeTypeSelected={props.iaeTypeSelected}
      onIAETypeChange={props.onIAETypeChange}
      iaeImplemented={props.iaeImplemented}
    />

    <IAETypeSelect
      iaeTypeSelected={props.iaeTypeSelected}
      onIAETypeChange={props.handleIAETypeChange}
    />

    <GameStep onValidateIAEs={props.handleValidateIAEs} />
  </div>

))

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
  handleValidateIAEs: PropTypes.func.isRequired
}

GameBoard.defaultProps = {}

export default GameBoard
