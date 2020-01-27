import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Header, Icon, Image, List, Message, Popup, Segment } from 'semantic-ui-react'
import score from '../../assets/score.png'
import { connect } from 'react-redux'
import scenarii from '../../config/scenarii'
import playersList from '../../config/playersList'

const GameInfosHistory = (props) => {
  const gamePlayersInfos = playersList.filter(p => props.gamePlayers.includes(p.number))
  const scenario = scenarii.find(s => s.number === props.game.scenario)

  return (

    <div>
      <Segment.Group stacked>

        <Segment color='red' inverted basic>
          <Header content={'Informations de la Partie ' + props.game._id} />
        </Segment>

        <Segment basic>

          <Header as='h2'>
            <Icon color='green' name='winner' />
            <Header.Content>Partie Gagnée</Header.Content>
          </Header>

          <Header as='h2'>
            <Icon flipped='vertically' color='red' name='winner' />
            <Header.Content>Partie Perdue</Header.Content>
          </Header>

        </Segment>

        <Divider />

        <Segment basic style={{ position: 'relative' }}>
          <Image src={score} />

          <Header style={{ position: 'absolute', left: '13%', top: '10%' }} content={props.game.production} />
          <Header style={{ position: 'absolute', left: '35%', top: '10%' }} content={props.game.tempsTravail} />
          <Header style={{ position: 'absolute', left: '58%', top: '10%' }} content={props.game.environnement} />
          <Header style={{ position: 'absolute', left: '80%', top: '10%' }} content={props.game.ancrageSocial} />

        </Segment>

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
                    <Icon color='green' name='winner' />
                    <Image avatar src={player.picture} />
                    <List.Content header={player.name} />
                  </List.Item>
                }
              />
            )}
          </List>

          <Header as='h3' color='red' content={'Scénario ' + props.game.scenario} dividing />
          <Message color='yellow' header='OBJECTIFS' content={scenario && scenario.objectives} />

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
