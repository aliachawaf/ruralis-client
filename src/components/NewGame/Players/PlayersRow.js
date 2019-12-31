import React from 'react'
import { Card, Grid, Image, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import players from '../../../config/players'

const PlayersRow = (props) => {
  const { playerRole, nbPlayersRequired, listPlayersSelected, handleOnClickPlayer } = props

  const listPlayersRole = players.filter(p => p.role === playerRole)

  const playersCompleted = listPlayersRole.filter(p => listPlayersSelected.includes(p.number)).length === nbPlayersRequired

  const role =
    (playerRole === 'agriculteur'
      ? 'Agriculteurs'
      : playerRole === 'acteur'
        ? 'Acteurs du territoire'
        : 'Conseiller(s)'
    )

  return (
    <Grid.Row>
      <Grid.Column width={3}>
        <Label circular>
          {nbPlayersRequired}
        </Label>
        {' ' + role}
      </Grid.Column>
      <Grid.Column width={13}>
        <Card.Group itemsPerRow={3}>
          {
            listPlayersRole.map(player =>
              <Card key={player.number}>
                {
                  playerRole !== 'acteur'
                    ? listPlayersSelected.includes(player.number)

                      ? <Label
                        as='a' corner='right' color='green' icon='check' size='mini'
                        onClick={() => handleOnClickPlayer(player.number)}
                        /> // eslint-disable-line

                      : playersCompleted

                        ? <Label corner='right' size='mini' />

                        : <Label
                          as='a' corner='right' icon='add' size='mini'
                          onClick={() => handleOnClickPlayer(player.number)}
                          />// eslint-disable-line

                    : <Label corner='right' color='green' icon='check' size='mini' />
                }

                <Card.Content>
                  <Image src={player.picture} centered size='mini' floated='right' />
                  <Card.Header>{player.name}</Card.Header>
                  <Card.Description>
                    {player.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            )
          }
        </Card.Group>
      </Grid.Column>
    </Grid.Row>
  )
}

PlayersRow.propTypes = {
  playerRole: PropTypes.string.isRequired,
  nbPlayersRequired: PropTypes.number.isRequired,
  listPlayersSelected: PropTypes.array.isRequired,
  handleOnClickPlayer: PropTypes.func.isRequired
}

export default PlayersRow
