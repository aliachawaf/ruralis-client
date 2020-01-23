import React from 'react'
import { Divider, Popup, Segment, Step } from 'semantic-ui-react'
import TimerStep1 from './TimerStep1'

const Description = () => (
  <Step.Group ordered vertical>

    <Popup
      content='Chacun décide seul quelle IAE il souhaite implémenter'
      position='bottom center'
      trigger={<Step content='Réflexion Personnelle' />}
    />

    <Popup
      content={'Chacun présente son choix d\'IAE, puis tous les joueurs décident d\'un seul type d\'IAE à implémanter'}
      position='bottom center'
      trigger={
        <Step>
              Discussion Collective
          <Divider hidden />
          <Segment padded basic><TimerStep1 /></Segment>
        </Step>
      }
    />

    <Popup
      content={'Ajouter l\'IAE choisie sur la carte d\'exploitation en vous référant à la légende et en utilisant  les outils de dessin.'}
      position='bottom center'
      trigger={<Step content={'Dessin de l\'IAE'} />}
    />

  </Step.Group>
)

export default Description
