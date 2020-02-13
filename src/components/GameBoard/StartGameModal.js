import React from 'react'
import { Button, Card, Divider, Header, Image, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import playersList from '../../config/playersList'
import { connect } from 'react-redux'
import scenarii from '../../config/scenarii'

const StartGameModal = (props) => {
  const { game, opened, handleStartGame } = props

  const gamePlayersInfos = playersList.filter(p => game.players.includes(p.number))
  const scenario = scenarii.find(s => s.number === game.scenario)

  return (
    <Modal
      open={opened}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      onClose={handleStartGame}

    >
      <Modal.Header>{'Récapitulatif de la partie ' + game.name}</Modal.Header>
      <Modal.Content>

        <Header as='h3' color='red' content={game.players.length + ' Joueurs'} dividing />
        <p>
          Chaque joueur se présente aux autres, en partageant son nom, son métier,
          ses intérêts, mais pas ses objectifs, qui doivent rester secrets !
        </p>

        <Card.Group itemsPerRow={4} stackable>
          {
            gamePlayersInfos.map(player =>
              <Card key={player.number}>
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

        <Divider hidden />

        <Header as='h3' color='red' content={'Scénario ' + game.scenario} dividing />
        <p>Présentation du scénario de départ ainsi que l'objectif commun à atteindre.</p>

        <Image src={scenario.description} size='big' centered />
        <Image src={scenario.map} centered />

      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleStartGame} negative content='Commencer la partie' />
      </Modal.Actions>
    </Modal>
  )
}

StartGameModal.propTypes = {
  game: PropTypes.object.isRequired,
  opened: PropTypes.bool.isRequired,
  handleStartGame: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps
)(StartGameModal)
