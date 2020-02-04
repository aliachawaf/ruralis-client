import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Container, Divider, Header, Icon, Image, List, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import playersList from '../../../../config/playersList'

const EndGame = (props) => {
  const gamePlayersInfos = playersList.filter(p => props.gamePlayers.includes(p.number))

  return (
    <Segment basic padded>
      <Header content='Fin du jeu' />

      <Divider hidden />

      <Container textAlign='left'>
        <Checkbox
          label='Objectif commun est-t-il atteint ?'
          checked={props.isObjectiveAchieved}
          onClick={props.onChangeObjectiveAchieved}
        />
      </Container>

      <Divider hidden />

      <p>Sélectionner les joueurs qui ont atteint leurs objectifs personnels</p>

      <Divider hidden />

      <Container textAlign='left'>
        <List>

          {gamePlayersInfos.map(player =>

            <List.Item key={player.number}>
              <List.Content floated='left'>
                <Checkbox
                  value={player.number}
                  checked={props.playersWinners.includes(player.number)}
                  onClick={props.onChangePlayerWinner}
                />
              </List.Content>

              <List.Content floated='right'>
                {props.playersWinners.includes(player.number)
                  ? <Icon color='green' name='winner' />
                  : <Icon flipped='vertically' color='red' name='winner' />}
              </List.Content>

              <Image avatar src={player.picture} />
              <List.Content header={player.name} />
            </List.Item>
          )}
        </List>

        {
          props.victory
            ? <Header as='h2'>
              <Icon color='green' name='winner' />
              <Header.Content>Partie Gagnée</Header.Content>
            </Header>// eslint-disable-line

            : <Header as='h2'>
              <Icon flipped='vertically' color='red' name='winner' />
              <Header.Content>Partie Perdue</Header.Content>
            </Header>// eslint-disable-line
        }
      </Container>

      <Divider hidden />

      <Button
        onClick={props.onValidateEndGame}
        content='Terminer la partie'
        color='red'
      />
    </Segment>
  )
}

EndGame.propTypes = {
  game: PropTypes.object.isRequired,
  gamePlayers: PropTypes.array.isRequired,
  victory: PropTypes.bool.isRequired,
  isObjectiveAchieved: PropTypes.bool.isRequired,
  playersWinners: PropTypes.array.isRequired,
  onChangePlayerWinner: PropTypes.func.isRequired,
  onChangeObjectiveAchieved: PropTypes.func.isRequired,
  onValidateEndGame: PropTypes.func.isRequired
}

EndGame.defaultProps = {
  gamePlayers: []
}

const mapStateToProps = state => ({
  game: state.game,
  gamePlayers: state.game.players
})

export default connect(
  mapStateToProps
)(EndGame)
