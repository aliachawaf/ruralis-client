import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap'
import IAETypeSelect from './IAETypeSelect'
import GameStep from './GameStep'
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'

import mapInfoLegend from '../../assets/mapInfoLegend.png'

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
    <Segment basic>
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
          <GameStep onValidateIAEs={handleValidateIAEs} />
        </Grid.Column>

      </Grid>
    </Segment>
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
