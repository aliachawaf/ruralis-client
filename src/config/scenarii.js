import {
  Description1,
  Description2,
  Description3,
  Description4,
  Description5,
  Description6,
  Map1,
  Map2,
  Map3,
  Map4,
  Map5,
  Map6
} from '../assets/scenarii'

const scenarii = [
  {
    number: 1,
    name: 'Eau',
    description: Description1,
    map: Map1,
    objectives: 'Implanter au moins 5 unités d\'IAE perpendiculaires à une pente, ' +
      '5 unités de prairies dans le périmètre de protection du captage et avoir au moins ' +
      '50 points "environnement" à la fin du jeu.'
  },
  {
    number: 2,
    name: 'Sol',
    description: Description2,
    map: Map2,
    objectives: 'Implanter au moins 10 unités d\'IAE perpendiculaires à une pente, ' +
      'et débloquer l\'action Introduction du non-travail du sol" du livret GEA.'
  },
  {
    number: 3,
    name: 'Vent',
    description: Description3,
    map: Map3,
    objectives: 'Implanter au moins 10 unités de haies pluristratifiées perpendiculaires' +
      'au vent dominant et avoir au moins 50 points "environnement" à la fin du jeu.'
  },
  {
    number: 4,
    name: 'Produit Phytosanitaires',
    description: Description4,
    map: Map4,
    objectives: 'Débloquer l\'action "Allongement de la rotation" du livret GEA et avoir au moins 30 points' +
      '"environnement" et 50 points "production" à la fin du jeu.'
  },
  {
    number: 5,
    name: 'Surface d\'Intérêt Ecologique',
    description: Description5,
    map: Map5,
    objectives: 'Implanter au moins 10 unités de haies pluristratifiées perpendiculaires' +
      'au vent dominant et avoir au moins 50 points "environnement" à la fin du jeu.'
  },
  {
    number: 6,
    name: 'Socio-territorial',
    description: Description6,
    map: Map6,
    objectives: 'Implanter au moins 15 unités d\'IAE linéaires le long des chemins de randonnées et avoir au ' +
      'moins 25 points d\'ancrage social à la fin du jeu.'
  }
]

export default scenarii
