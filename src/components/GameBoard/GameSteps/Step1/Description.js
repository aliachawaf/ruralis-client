import React from 'react'
import { Popup, Step } from 'semantic-ui-react'

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
      trigger={<Step content='Discussion Collective' />}
    />

    <Popup
      content={'Ajouter l\'IAE choisie sur la carte d\'exploitation en vous référant à la légende et en utilisant  les outils de dessin.'}
      position='bottom center'
      trigger={<Step content={'Dessin de l\'IAE'} />}
    />

  </Step.Group>
)

export default Description
