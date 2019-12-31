import React from 'react'
import { Container, Divider, Grid, Input, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import PlayersRow from './PlayersRow'

const PlayersSelect = (props) => {
  const { handleOnChangeNbPlayers, nbPlayers, handleOnClickPlayer, playersSelected } = props

  const nbFarmersRequired = (nbPlayers > 6 ? 3 : 2)
  const nbActorsRequired = 2
  const nbAdvisersRequired = (nbPlayers < 6 ? 1 : 2)

  return (
    <Segment placeholder padded>
      <Container>
        <Input
          label='Nombre de joueurs'
          type='number'
          min={5}
          max={7}
          value={nbPlayers}
          onChange={handleOnChangeNbPlayers}
        />
      </Container>
      <Divider hidden />
      <Grid columns={2} textAlign='left' verticalAlign='middle'>
        <PlayersRow
          playerRole='agriculteur'
          nbPlayersRequired={nbFarmersRequired}
          listPlayersSelected={playersSelected}
          handleOnClickPlayer={handleOnClickPlayer}
        />

        <Divider horizontal>ET</Divider>

        <PlayersRow
          playerRole='acteur'
          nbPlayersRequired={nbActorsRequired}
          listPlayersSelected={playersSelected}
          handleOnClickPlayer={handleOnClickPlayer}
        />

        <Divider horizontal>ET</Divider>

        <PlayersRow
          playerRole='conseiller'
          nbPlayersRequired={nbAdvisersRequired}
          listPlayersSelected={playersSelected}
          handleOnClickPlayer={handleOnClickPlayer}
        />
      </Grid>
    </Segment>
  )
}

PlayersSelect.propTypes = {
  handleOnChangeNbPlayers: PropTypes.func.isRequired,
  nbPlayers: PropTypes.number.isRequired,
  handleOnClickPlayer: PropTypes.func.isRequired,
  playersSelected: PropTypes.array.isRequired
}

PlayersSelect.defaultProps = {
  nbPlayers: 5,
  playersSelected: []
}

export default PlayersSelect
