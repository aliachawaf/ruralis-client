import React from 'react'
import { Button, Card, Divider, Header, Image, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const StartGameModal = (props) => {
  const { players, opened, handleStartGame } = props

  return (
    <Modal
      open={opened}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      onClose={handleStartGame}

    >
      <Modal.Header>Début du jeu</Modal.Header>
      <Modal.Content>

        <Header as='h3' color='red' content='Joueurs' dividing />
        <p>
          Chaque joueur se présente aux autres, en partageant son nom, son métier,
          ses intérêts, mais pas ses objectifs, qui doivent rester secrets !
        </p>

        <Card.Group itemsPerRow={4}>
          {
            players.map((player, index) =>
              <Card key={index}>
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

        <Header as='h3' color='red' content='Scénario' dividing />
        <p>Présentation du scénario de départ ainsi que l'objectif commun à atteindre.</p>

      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleStartGame} negative content='Commencer la partie' />
      </Modal.Actions>
    </Modal>
  )
}

StartGameModal.propTypes = {
  players: PropTypes.array.isRequired,
  opened: PropTypes.bool.isRequired,
  handleStartGame: PropTypes.func.isRequired
}

export default StartGameModal
