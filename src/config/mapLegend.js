import L from 'leaflet'
import orangeDot from '../assets/mapLegend/orangeDot.png'

import {
  BEenergieIcon,
  BEenergieLegend,
  BEentretienLegend,
  BEfaucheIcon,
  BEfaucheLegend,
  BEfauchepatureIcon,
  BEfauchepatureLegend,
  BEpatureIcon,
  BEpatureLegend,
  BFendpoint,
  BFenergieIcon,
  BFenergieLegend,
  BFentretienLegend,
  BFfaucheIcon,
  BFfaucheLegend,
  BFfauchepatureIcon,
  BFfauchepatureLegend,
  BFpatureIcon,
  BFpatureLegend,
  HMbroyatIcon,
  HMbroyatLegend,
  HMenergieIcon,
  HMenergieLegend,
  HMentretienLegend,
  HPboisIcon,
  HPboisLegend,
  HPbroyatIcon,
  HPbroyatLegend,
  HPenergieIcon,
  HPenergieLegend,
  HPentretienLegend
} from '../assets/mapLegend'

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

const BFendpointLeft =
  {
    offset: '0px',
    repeat: '0px',
    symbol: L.Symbol.marker({
      markerOptions: {
        icon: L.icon({
          iconUrl: BFendpoint,
          iconAnchor: [8, 8]
        })
      }
    })
  }

const BFendpointRight =
  {
    offset: '100%',
    repeat: '0px',
    symbol: L.Symbol.marker({
      markerOptions: {
        icon: L.icon({
          iconUrl: BFendpoint,
          iconAnchor: [8, 8]
        })
      }
    })
  }

const mapLegend = [
  /** *********************************** GROUP HAIE MONOSTRATIFIEE *************************************/
  {
    iaeGroup: 'Haie Monostratifiée',
    drawingType: 'polyline',
    color: '#E06A35',
    environment: 1,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: HMentretienLegend,
        decorator: [],
        production: 0,
        workingTime: -2
      },
      {
        iaeName: 'énergie',
        iaeLegend: HMenergieLegend,
        decorator: [{
          repeat: '10px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: HMenergieIcon,
                iconAnchor: [8, 8]
              })
            }
          })
        }],
        production: 2,
        workingTime: -4
      },
      {
        iaeName: 'broyat',
        iaeLegend: HMbroyatLegend,
        production: 1,
        workingTime: -3,
        decorator: [{
          repeat: '30px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: HMbroyatIcon,
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
    color: '#C02B2D',
    environment: 2,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: HPentretienLegend,
        decorator: [],
        production: 0,
        workingTime: -1
      },
      {
        iaeName: 'énergie',
        iaeLegend: HPenergieLegend,
        decorator: [{
          repeat: '10px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: HPenergieIcon,
                iconAnchor: [8, 8]
              })
            }
          })
        }],
        production: 2,
        workingTime: -3
      },
      {
        iaeName: 'broyat',
        iaeLegend: HPbroyatLegend,
        production: 1,
        workingTime: -2,
        decorator: [{
          repeat: '30px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: HPbroyatIcon,
                iconAnchor: [8, 8]
              })
            }
          })
        }]
      },
      {
        iaeName: 'bois d\'oeuvre',
        iaeLegend: HPboisLegend,
        production: 3,
        workingTime: -4,
        decorator: [{
          offset: '5px',
          endOffset: '5px',
          repeat: '16px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: HPboisIcon,
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
    color: '#99ccff',
    environment: 1,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: BEentretienLegend,
        production: 1,
        workingTime: -1,
        decorator: []
      },
      {
        iaeName: 'énergie',
        iaeLegend: BEenergieLegend,
        production: 2,
        workingTime: -1,
        decorator: [{
          offset: '10%',
          repeat: '10px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: BEenergieIcon,
                iconAnchor: [8, 8]
              })
            }
          })
        }]
      },
      {
        iaeName: 'fauche',
        iaeLegend: BEfaucheLegend,
        production: 1,
        workingTime: -2,
        decorator: [{
          offset: '25px',
          repeat: '25px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: BEfaucheIcon,
                iconAnchor: [22, 0]
              })
            }
          })
        }]
      },
      {
        iaeName: 'patûre',
        iaeLegend: BEpatureLegend,
        production: 1,
        workingTime: -1,
        decorator: [{
          offset: '25px',
          repeat: '25px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: BEpatureIcon,
                iconAnchor: [22, 0]
              })
            }
          })
        }]
      },
      {
        iaeName: 'fauche et patûre',
        iaeLegend: BEfauchepatureLegend,
        production: 2,
        workingTime: -3,
        decorator: [{
          offset: '25px',
          repeat: '30px',
          symbol: L.Symbol.marker({
            rotate: true,
            markerOptions: {
              icon: L.icon({
                iconUrl: BEfauchepatureIcon,
                iconAnchor: [22, 0]
              })
            }
          })
        }]
      }
    ]
  },

  /** ************************************** GROUP BANDE FLEURIE ***************************************/
  {
    iaeGroup: 'Bande Fleurie',
    drawingType: 'polyline',
    color: '#312C67',
    environment: 2,
    iaeList: [
      {
        iaeName: 'entretien seul',
        iaeLegend: BFentretienLegend,
        production: 1,
        workingTime: -1,
        decorator: [
          BFendpointLeft,
          BFendpointRight
        ]
      },
      {
        iaeName: 'énergie',
        iaeLegend: BFenergieLegend,
        decorator: [
          BFendpointLeft,
          BFendpointRight,
          {
            offset: '12px',
            endOffset: '10px',
            repeat: '10px',
            symbol: L.Symbol.marker({
              rotate: true,
              markerOptions: {
                icon: L.icon({
                  iconUrl: BFenergieIcon,
                  iconAnchor: [8, 8]
                })
              }
            })
          }
        ]
      },
      {
        iaeName: 'fauche',
        iaeLegend: BFfaucheLegend,
        decorator: [
          BFendpointLeft,
          BFendpointRight,
          {
            offset: '25px',
            repeat: '25px',
            symbol: L.Symbol.marker({
              rotate: true,
              markerOptions: {
                icon: L.icon({
                  iconUrl: BFfaucheIcon,
                  iconAnchor: [22, 0]
                })
              }
            })
          }]
      },
      {
        iaeName: 'patûre',
        iaeLegend: BFpatureLegend,
        production: 2,
        workingTime: -2,
        decorator: [
          BFendpointLeft,
          BFendpointRight,
          {
            offset: '25px',
            repeat: '25px',
            symbol: L.Symbol.marker({
              rotate: true,
              markerOptions: {
                icon: L.icon({
                  iconUrl: BFpatureIcon,
                  iconAnchor: [22, 0]
                })
              }
            })
          }]
      },
      {
        iaeName: 'fauche et patûre',
        iaeLegend: BFfauchepatureLegend,
        decorator: [
          BFendpointLeft,
          BFendpointRight,
          {
            offset: '40px',
            repeat: '30px',
            symbol: L.Symbol.marker({
              rotate: true,
              markerOptions: {
                icon: L.icon({
                  iconUrl: BFfauchepatureIcon,
                  iconAnchor: [22, 0]
                })
              }
            })
          }]
      }
    ]
  },

  /** *********************************** GROUP PRAIRIE PERMANENTE  ************************************/
  {
    iaeGroup: 'Prairie Permanente',
    drawingType: 'polygon',
    color: '#34996F',
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
    color: '#1A1919',
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
    color: '#49275A',
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
    color: '#64372F',
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
