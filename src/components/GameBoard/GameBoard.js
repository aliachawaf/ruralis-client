import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap'
import IAETypeSelect from './IAETypeSelect'
import GameStep from './GameStep'
import { Grid } from 'semantic-ui-react'

const GameBoard = React.forwardRef((props, ref) => {
  const {
    bounds,
    handleCreatedIAE,
    iaeImplemented,
    iaeTypeSelected,
    handleIAETypeChange,
    handleValidateIAEs
  } = props

  return (
    <Grid columns={3} stackable>

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

      <Grid.Column width={4}>
        <IAETypeSelect
          iaeTypeSelected={iaeTypeSelected}
          onIAETypeChange={handleIAETypeChange}
        />
      </Grid.Column>

      <Grid.Column width={3}>
        <GameStep onValidateIAEs={handleValidateIAEs} />
      </Grid.Column>

    </Grid>
  )
})

GameBoard.propTypes = {
  // GameMap
  bounds: PropTypes.array.isRequired,
  handleCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  // IAE Type Select
  iaeTypeSelected: PropTypes.string.isRequired,
  handleIAETypeChange: PropTypes.func.isRequired,
  // Game Step
  handleValidateIAEs: PropTypes.func.isRequired
}

GameBoard.defaultProps = {
  iaeImplemented: [],
  iaeTypeSelected: '00'
}

export default GameBoard
