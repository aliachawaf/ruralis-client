import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RuralisHeader from '../common/RuralisHeader'
import { Container, Divider, Icon, Statistic, Table } from 'semantic-ui-react'

const breadcrumbSections = [
  { key: 'joinGame', content: 'Rejoindre une partie', active: true, as: 'h3' }
]

const JoinGame = (props) => {
  const gamesNotEnded = props.games.filter(game => !game.ended).reverse()

  return (
    <div>
      <RuralisHeader breadcrumbSections={breadcrumbSections} />

      <Container>
        <Statistic.Group>
          <Statistic label='Parties à jouer' value={gamesNotEnded.length} />
          <Statistic label='entamées' value={gamesNotEnded.filter(g => g.numTour !== 0).length} color='green' />
          <Statistic label='non entamées' value={gamesNotEnded.filter(g => g.numTour === 0).length} color='red' />
        </Statistic.Group>
      </Container>

      <Divider />

      <Container>
        <Table textAlign='center' selectable padded color='red'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Partie</Table.HeaderCell>
              <Table.HeaderCell>Numéro de tour</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
              <Table.HeaderCell>Joueurs</Table.HeaderCell>
              <Table.HeaderCell>Scenario</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {gamesNotEnded
              .map(game =>
                <Table.Row key={game._id} value={game._id} onClick={() => props.redirectToGameBoard(game._id)}>
                  <Table.Cell content={game._id + '. ' + game.name} />

                  <Table.Cell>
                    {'Tour ' + game.numTour}
                  </Table.Cell>

                  <Table.Cell>
                    <Statistic.Group size='mini'>
                      <Statistic label='production' value={game.production} color='red' />
                      <Statistic label='temps de travail' value={game.tempsTravail} color='yellow' />
                      <Statistic label='environnement' value={game.environnement} color='green' />
                      <Statistic label='ancrage social' value={game.ancrageSocial} color='purple' />
                    </Statistic.Group>
                  </Table.Cell>

                  <Table.Cell>
                    <Icon name='users' /> {game.players.length}
                  </Table.Cell>

                  <Table.Cell>
                    <Icon name='file text' /> {game.scenario}
                  </Table.Cell>
                </Table.Row>
              )}

          </Table.Body>
        </Table>
      </Container>
    </div>
  )
}

JoinGame.propTypes = {
  games: PropTypes.array.isRequired,
  redirectToGameBoard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  games: state.games
})

export default connect(
  mapStateToProps
)(JoinGame)
