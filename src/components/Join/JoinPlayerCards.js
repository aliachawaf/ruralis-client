import React from 'react'
import RuralisHeader from '../common/RuralisHeader'
import { Card, Container, Divider, Header, Image } from 'semantic-ui-react'
import playersList from '../../config/playersList'

const breadcrumbSections = [
  { key: 'joinPlayer', content: 'Cartes des joueurs', active: true, as: 'h3' }
]

const JoinPlayerCards = (props) => (
  <div>
    <RuralisHeader breadcrumbSections={breadcrumbSections} />

    <Container>
      <Header as='h3' color='red' icon='address card' content='Cliquer sur votre joueur pour accéder aux cartes' />
    </Container>

    <Divider />

    <Container>
      <Card.Group>
        {
          playersList.map(player =>
            <Card key={player.number} link centered onClick={() => props.history.push('/player/' + player.number)}>
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
    </Container>
  </div>
)

export default JoinPlayerCards
