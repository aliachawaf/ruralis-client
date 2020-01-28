import action1 from '../assets/livretGEA/1.png'
import action2 from '../assets/livretGEA/2.png'
import action3 from '../assets/livretGEA/3.png'
import action4 from '../assets/livretGEA/4.png'
import action5 from '../assets/livretGEA/5.png'
import action6 from '../assets/livretGEA/6.png'
import action7 from '../assets/livretGEA/7.png'
import action8 from '../assets/livretGEA/8.png'

const actions = [
  {
    numCard: 1,
    cardPicture: action1,
    title: 'Achat de matériel agricole',
    environnementEffect: -10,
    productionEffect: -20,
    tempsTravailEffect: 20,
    ancrageSocialEffect: 10,
    environnementCondition: 0,
    productionCondition: 0,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 0
  },
  {
    numCard: 2,
    cardPicture: action2,
    title: 'Allongement de la rotation',
    environnementEffect: 10,
    productionEffect: 20,
    tempsTravailEffect: -5,
    ancrageSocialEffect: 0,
    environnementCondition: 20,
    productionCondition: 0,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 0
  },
  {
    numCard: 3,
    cardPicture: action3,
    title: 'Augmentation du cheptel',
    environnementEffect: 0,
    productionEffect: -30,
    tempsTravailEffect: -15,
    ancrageSocialEffect: 0,
    environnementCondition: 0,
    productionCondition: 30,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 0
  },
  {
    numCard: 4,
    cardPicture: action4,
    title: 'Développement de l\'agrotourisme',
    environnementEffect: 0,
    productionEffect: 20,
    tempsTravailEffect: -20,
    ancrageSocialEffect: 0,
    environnementCondition: 0,
    productionCondition: 0,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 30
  },
  {
    numCard: 5,
    cardPicture: action5,
    title: 'Introduction du non travail du sol',
    environnementEffect: 15,
    productionEffect: -5,
    tempsTravailEffect: 15,
    ancrageSocialEffect: 0,
    environnementCondition: 0,
    productionCondition: 30,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 0
  },
  {
    numCard: 6,
    cardPicture: action6,
    title: 'Nouvelle subvention pour l\'envrionnement',
    environnementEffect: 0,
    productionEffect: 10,
    tempsTravailEffect: 0,
    ancrageSocialEffect: -5,
    environnementCondition: 30,
    productionCondition: 0,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 0
  },
  {
    numCard: 7,
    cardPicture: action7,
    title: 'Embauche d\'un salarié',
    environnementEffect: 0,
    productionEffect: -20,
    tempsTravailEffect: 30,
    ancrageSocialEffect: 10,
    environnementCondition: 0,
    productionCondition: 0,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 0
  },
  {
    numCard: 8,
    cardPicture: action8,
    title: 'Partage du territoire agricole',
    environnementEffect: 0,
    productionEffect: -5,
    tempsTravailEffect: 5,
    ancrageSocialEffect: 15,
    environnementCondition: 0,
    productionCondition: 10,
    tempsTravailCondition: 0,
    ancrageSocialCondition: 0
  }
]

export default actions
