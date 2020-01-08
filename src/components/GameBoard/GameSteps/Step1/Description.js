import React from 'react'
import { Popup, Step } from 'semantic-ui-react'

const Description = () => (
  <Step.Group size='mini'>

    <Popup
      content='Chacun décide seul quelle IAE il souhaite implémenter'
      position='bottom center'
      trigger={
        <Step>
          <Step.Content>
            <Step.Title>Réflexion Personnelle</Step.Title>
          </Step.Content>
        </Step>
      }
    />

    <Popup
      content={'Chacun présente son choix d\'IAE, puis tous les joueurs décident d\'un seul type d\'IAE à implémanter'}
      position='bottom center'
      trigger={
        <Step>
          <Step.Content>
            <Step.Title>Discussion Collective</Step.Title>
          </Step.Content>
        </Step>
      }
    />

    <Popup
      content={'Ajouter l\'IAE choisie sur la carte d\'exploitation en vous référant à la légende et en utilisant  les outils de dessin.'}
      position='bottom center'
      trigger={
        <Step>
          <Step.Content>
            <Step.Title>Dessin de l'IAE</Step.Title>
          </Step.Content>
        </Step>
      }
    />

  </Step.Group>
)

export default Description
