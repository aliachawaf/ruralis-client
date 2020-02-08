import React from 'react'
import './styleHome.css'

import { Button, Container, Divider, Grid, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ruralisLogo from '../../assets/logos/ruralisLogo.png'
import logoActa from '../../assets/logos/logoActa.jpg'
import logoRMT from '../../assets/logos/logoRMT.jpeg'
import logoMinistere from '../../assets/logos/logoMinistere.jpeg'

const HomeRuralis = () => (
  <Container className='homePage'>

    <Image src={ruralisLogo} size='medium' centered />

    <Divider hidden />

    <Grid columns={4} stackable padded relaxed>
      <Grid.Row>
        <Grid.Column>
          <Link to='/new/game'>
            <Button className='homeBtn' icon='pencil' color='red' fluid content='Nouvelle Partie' size='huge' />
          </Link>
        </Grid.Column>

        <Grid.Column>
          <Link to='/join/game'>
            <Button className='homeBtn' icon='map' color='red' fluid content='Accéder Partie' size='huge' />
          </Link>
        </Grid.Column>

        <Grid.Column>
          <Link to='/join/playerCards'>
            <Button className='homeBtn' icon='address card' color='red' fluid content='Cartes des joueurs' size='huge' />
          </Link>
        </Grid.Column>

        <Grid.Column>
          <Link to='/history/games'>
            <Button className='homeBtn' icon='list' color='red' fluid content='Historique Parties' size='huge' />
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Divider hidden />

    <Container textAlign='right'>
      <Link to='/game/rules'>
        <Label as='a' icon='file' size='big' content='Règles du jeu' />
      </Link>
    </Container>

    <Divider />

    <Container textAlign='left'>
      <Image.Group>
        <Image src={logoRMT} size='medium' as='a' href='http://www.rmt-biodiversite-agriculture.fr/' target='_blank' />
        <Image src={logoActa} size='tiny' as='a' href='http://www.acta.asso.fr/' target='_blank' />
        <Image src={logoMinistere} size='tiny' as='a' href='https://agriculture.gouv.fr/thematique-generale/ministere' target='_blank' />
      </Image.Group>
    </Container>

  </Container>
)

export default HomeRuralis
