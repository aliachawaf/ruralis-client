import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Header, Icon, Image, List, Message, Popup, Segment, Statistic } from 'semantic-ui-react'
import { connect } from 'react-redux'
import scenarii from '../../config/scenarii'
import playersList from '../../config/playersList'
import GameScore from '../common/GameScore'

const GameInfosHistory = (props) => {
  const gamePlayersInfos = playersList.filter(p => props.gamePlayers.includes(p.number))
  const scenario = scenarii.find(s => s.number === props.game.scenario)

  return (

    <div>
      <Segment.Group stacked>

        <Segment color='red' inverted basic>
          <Header content='Informations de la Partie' />
        </Segment>

        <Segment basic>

          {
            props.game.victory
              ? <Header as='h2'>
                <Icon color='green' name='winner' />
                <Header.Content>Partie Gagnée</Header.Content>
              </Header>// eslint-disable-line

              : <Header as='h2'>
                <Icon flipped='vertically' color='red' name='winner' />
                <Header.Content>Partie Perdue</Header.Content>
              </Header>// eslint-disable-line
          }

          <Segment basic>
            <Statistic size='small'>
              <Statistic.Label>Tour</Statistic.Label>
              <Statistic.Value>{props.game.numTour} / 7</Statistic.Value>
            </Statistic>
          </Segment>
        </Segment>

        <GameScore
          production={props.game.production}
          tempsTravail={props.game.tempsTravail}
          environnement={props.game.environnement}
          ancrageSocial={props.game.ancrageSocial}
        />

        <Divider />

        <Segment basic textAlign='left'>

          <Header as='h3' color='red' content={props.gamePlayers.length + ' Joueurs'} dividing />

          <List relaxed divided>
            {gamePlayersInfos.map(player =>
              <Popup
                key={player.number}
                wide
                position='top left'
                content={<Image src={player.card} />}
                trigger={
                  <List.Item>
                    {props.game.victoryPlayers.includes(player.number)
                      ? <Icon color='green' name='winner' />
                      : <Icon flipped='vertically' color='red' name='winner' />}
                    <Image avatar src={player.picture} />
                    <List.Content header={player.name} />
                  </List.Item>
                }
              />
            )}
          </List>

          <Header as='h3' color='red' content={'Scénario ' + props.game.scenario} dividing />
          <Message color='yellow' header='OBJECTIF COMMUN' content={scenario && scenario.objectives} />

        </Segment>

      </Segment.Group>
    </div>

  )
}

GameInfosHistory.propTypes = {
  game: PropTypes.object.isRequired,
  gamePlayers: PropTypes.array.isRequired
}

GameInfosHistory.defaultProps = {
  gamePlayers: []
}

const mapStateToProps = state => ({
  game: state.game,
  gamePlayers: state.game.players
})

export default connect(
  mapStateToProps
)(GameInfosHistory)
