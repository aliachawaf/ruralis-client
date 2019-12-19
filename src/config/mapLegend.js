import L from 'leaflet'
import orangeDot from '../assets/mapLegend/orangeDot.png'
import redDot from '../assets/mapLegend/redDot.png'
import redV from '../assets/mapLegend/redV.png'

/**
 *
 * @type {{
 * iaeGroup
 * iaeName
 * color
 * decorator
 * drawingType
 * }[]}
 */

export const mapLegend = [
  {
    iaeGroup: 'Haie Monostratifiée',
    iaeName: 'entretien seul',
    color: 'orange',
    decorator: [],
    drawingType: 'polyline'
  },
  {
    iaeGroup: 'Haie Monostratifiée',
    iaeName: 'énergie',
    color: 'orange',
    decorator: [],
    drawingType: 'polyline'
  },
  {
    iaeGroup: 'Haie Monostratifiée',
    iaeName: 'broyat',
    color: 'orange',
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
    }],
    drawingType: 'polyline'
  },
  {
    iaeGroup: 'Haie Pluristratifiée',
    iaeName: 'entretien seul',
    color: 'red',
    decorator: [],
    drawingType: 'polyline'
  },
  {
    iaeGroup: 'Haie Pluristratifiée',
    iaeName: 'énergie',
    color: 'red',
    decorator: [],
    drawingType: 'polyline'
  },
  {
    iaeGroup: 'Haie Pluristratifiée',
    iaeName: 'broyat',
    color: 'red',
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
    }],
    drawingType: 'polyline'
  },
  {
    iaeGroup: 'Haie Pluristratifiée',
    iaeName: 'bois d\'oeuvre',
    color: 'red',
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
    }],
    drawingType: 'polyline'
  },
  {
    iaeGroup: 'Mares',
    iaeName: 'entretien seul',
    color: 'brown',
    decorator: [],
    drawingType: 'circle'
  }
]
