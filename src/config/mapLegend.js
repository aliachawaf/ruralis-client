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
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'broyat',
        iaeLegend: orangeDot,
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
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'broyat',
        iaeLegend: orangeDot,
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
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
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
        decorator: []
      },
      {
        iaeName: 'fauche et patûre',
        iaeLegend: orangeDot,
        decorator: []
      }
    ]
  },

  /** ************************************** GROUP BANDE FLEURIE ***************************************/
  {
    iaeGroup: 'Bande Fleurie',
    drawingType: 'polyline',
    color: 'purple',
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
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
    iaeList: [
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
        decorator: []
      },
      {
        iaeName: 'fauche et patûre',
        iaeLegend: orangeDot,
        decorator: []
      }
    ]
  },

  /** **************************************** GROUP BOSQUET  ******************************************/
  {
    iaeGroup: 'Bosquet',
    drawingType: 'polygon',
    color: 'black',
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'broyat',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'bois d\'oeuvre',
        iaeLegend: orangeDot,
        decorator: []
      }
    ]
  },

  /** ***************************** GROUP AGROFORESTERIE INTRAPARCELLAIRE  *****************************/
  {
    iaeGroup: 'Agroforesterie Intraparcellaire',
    drawingType: 'polygon',
    color: 'purple',
    iaeList: [
      {
        iaeName: 'énergie',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'bois d\'oeuvre',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'pré-verger',
        iaeLegend: orangeDot,
        decorator: []
      }
    ]
  },

  /** ***************************************** GROUP MARES  *******************************************/
  {
    iaeGroup: 'Mares',
    drawingType: 'circle',
    color: 'brown',
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: orangeDot,
        decorator: []
      },
      {
        iaeName: 'abreuvement animaux',
        iaeLegend: orangeDot,
        decorator: []
      }
    ]
  }
]

export default mapLegend
