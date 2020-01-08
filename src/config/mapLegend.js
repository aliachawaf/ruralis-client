import L from 'leaflet'
import orangeDot from '../assets/mapLegend/orangeDot.png'
import redDot from '../assets/mapLegend/redDot.png'
import redV from '../assets/mapLegend/redV.png'

/**
 * @type {*[]}
 *
 * [
 * {
 *   iaeGroup
 *   drawingType
 *   color
 *   iaeList : [iaeName, iaeLegend, decorator]
 * }*
 * ]
 *
 */

const mapLegend = [
  /** *********************************** GROUP HAIE MONOSTRATIFIEE *************************************/
  {
    iaeGroup: 'Haie Monostratifiée',
    drawingType: 'polyline',
    color: 'orange',
    environment: 1,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        decorator: [],
        production: 0,
        workingTime: -2
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        decorator: [],
        production: 2,
        workingTime: -4
      },
      {
        iaeName: 'broyat',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: -3,
        decorator: [{
          offset: '10%',
          repeat: '30px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: orangeDot,
                iconAnchor: [8, 8]
              })
            }
          })
        }]
      }
    ]
  },

  /** ********************************** GROUP HAIE PLURISTRATIFIEE ************************************/
  {
    iaeGroup: 'Haie Pluristratifiée',
    drawingType: 'polyline',
    color: 'red',
    environment: 2,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        decorator: [],
        production: 0,
        workingTime: -1
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        decorator: [],
        production: 2,
        workingTime: -3
      },
      {
        iaeName: 'broyat',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: -2,
        decorator: [{
          offset: '10%',
          repeat: '30px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: redDot,
                iconAnchor: [8, 8]
              })
            }
          })
        }]
      },
      {
        iaeName: 'bois d\'oeuvre',
        iaeLegend: orangeDot,
        production: 3,
        workingTime: -4,
        decorator: [{
          offset: '10%',
          repeat: '16px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: redV,
                iconAnchor: [8, 8]
              })
            }
          })
        }]
      }
    ]
  },

  /** ************************************* GROUP BANDE ENHERBEE ***************************************/
  {
    iaeGroup: 'Bande Enherbée',
    drawingType: 'polyline',
    color: 'blue',
    environment: 1,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        production: 2,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'fauche',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: -2,
        decorator: []
      },
      {
        iaeName: 'patûre',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'fauche et patûre',
        iaeLegend: orangeDot,
        production: 2,
        workingTime: -3,
        decorator: []
      }
    ]
  },

  /** ************************************** GROUP BANDE FLEURIE ***************************************/
  {
    iaeGroup: 'Bande Fleurie',
    drawingType: 'polyline',
    color: 'purple',
    environment: 2,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'fauche',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'patûre',
        iaeLegend: orangeDot,
        production: 2,
        workingTime: -2,
        decorator: []
      },
      {
        iaeName: 'fauche et patûre',
        iaeLegend: orangeDot,
        decorator: []
      }
    ]
  },

  /** *********************************** GROUP PRAIRIE PERMANENTE  ************************************/
  {
    iaeGroup: 'Prairie Permanente',
    drawingType: 'polygon',
    color: 'green',
    environment: 2,
    iaeList: [
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        production: 0,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'fauche',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: 1,
        decorator: []
      },
      {
        iaeName: 'patûre',
        iaeLegend: orangeDot,
        production: 2,
        workingTime: 0,
        decorator: []
      },
      {
        iaeName: 'fauche et patûre',
        iaeLegend: orangeDot,
        production: 2,
        workingTime: 1,
        decorator: []
      }
    ]
  },

  /** **************************************** GROUP BOSQUET  ******************************************/
  {
    iaeGroup: 'Bosquet',
    drawingType: 'polygon',
    color: 'black',
    environment: 3,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        production: 0,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        production: 2,
        workingTime: -3,
        decorator: []
      },
      {
        iaeName: 'broyat',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: -2,
        decorator: []
      },
      {
        iaeName: 'bois d\'oeuvre',
        iaeLegend: orangeDot,
        production: 3,
        workingTime: -4,
        decorator: []
      }
    ]
  },

  /** ***************************** GROUP AGROFORESTERIE INTRAPARCELLAIRE  *****************************/
  {
    iaeGroup: 'Agroforesterie Intraparcellaire',
    drawingType: 'polygon',
    color: 'purple',
    environment: 1,
    iaeList: [
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        production: 2,
        workingTime: -4,
        decorator: []
      },
      {
        iaeName: 'bois d\'oeuvre',
        iaeLegend: orangeDot,
        production: 4,
        workingTime: -4,
        decorator: []
      },
      {
        iaeName: 'pré-verger',
        iaeLegend: orangeDot,
        production: 3,
        workingTime: -3,
        decorator: []
      }
    ]
  },

  /** ***************************************** GROUP MARES  *******************************************/
  {
    iaeGroup: 'Mares',
    drawingType: 'circle',
    color: 'brown',
    environment: 3,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        production: 0,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'abreuvement animaux',
        iaeLegend: orangeDot,
        production: 1,
        workingTime: 1,
        decorator: []
      }
    ]
  }
]

export default mapLegend
