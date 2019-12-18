import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap'
import IAETypeSelect from './IAETypeSelect'

const GameBoard = React.forwardRef((props, ref) => (

  <div>
    <GameMap
      ref={ref}
      bounds={props.bounds}
      handleIAECreated={props.handleIAECreated}
      iaeTypeSelected={props.iaeTypeSelected}
      handleIAETypeChange={props.handleIAETypeChange}
      iaeImplemented={props.iaeImplemented}
    />

    <IAETypeSelect
      iaeTypeSelected={props.iaeTypeSelected}
      handleIAETypeChange={props.handleIAETypeChange}
    />

  </div>

))

GameBoard.propTypes = {
  // GameMap
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  bounds: PropTypes.array.isRequired,
  handleIAECreated: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  // IAE Type Select
  iaeTypeSelected: PropTypes.string.isRequired,
  handleIAETypeChange: PropTypes.func.isRequired
}

GameBoard.defaultProps = {}

export default GameBoard
