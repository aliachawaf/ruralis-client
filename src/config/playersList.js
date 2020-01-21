import {
  BuissonPic,
  CerecopePic,
  ConventionPic,
  ReveurPic,
  SolamourPic,
  TourdeplainePic,
  WatersPic
} from '../assets/players/pictures'

import {
  BuissonCard,
  CerecopeCard,
  ConventionCard,
  ReveurCard,
  SolamourCard,
  TourdeplaineCard,
  WatersCard
} from '../assets/players/cards'

const playersList = [
  {
    number: 1,
    role: 'agriculteur',
    name: 'Jonathan Rêveur',
    description: 'Agriculteur et observateur de la nature',
    picture: ReveurPic,
    card: ReveurCard,
    color: '#B11117'
  },
  {
    number: 2,
    role: 'agriculteur',
    name: 'Marguerite Convention',
    description: 'Agricultrice - " Toujours produire pour ne manquer de rien "',
    picture: ConventionPic,
    card: ConventionCard,
    color: '#B11117'
  },
  {
    number: 3,
    role: 'agriculteur',
    name: 'Clément Buisson',
    description: 'Agriculteur et chasseur dans les broussailles',
    picture: BuissonPic,
    card: BuissonCard,
    color: '#B11117'
  },
  {
    number: 4,
    role: 'acteur',
    name: 'Mme Waters',
    description: 'Experte agriculture et environnement à l\'Agence de l\'eau',
    picture: WatersPic,
    card: WatersCard,
    color: '#F59430'
  },
  {
    number: 5,
    role: 'acteur',
    name: 'M. Tourdeplaine',
    description: 'Responsable-environnement au bureau d\'étude chargé du SCOT',
    picture: TourdeplainePic,
    card: TourdeplaineCard,
    color: '#F59430'
  },
  {
    number: 6,
    role: 'conseiller',
    name: 'Mme Solamour',
    description: 'Conseillère " le sol est la base de la vie "',
    picture: SolamourPic,
    card: SolamourCard,
    color: '#F1592A'
  },
  {
    number: 7,
    role: 'conseiller',
    name: 'M. Cérécope',
    description: 'Conseiller " In céréales we trust! "',
    picture: CerecopePic,
    card: CerecopeCard,
    color: '#F1592A'
  }
]

export default playersList
