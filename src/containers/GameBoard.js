import React from 'react'

import GameMap from '../components/GameMap'

const bounds = [[0, 0], [900, 1050]]
const mapRef = React.createRef()

class GameBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      iaeImplemented: []
    }
    this.onCreatedIAE = this.onCreatedIAE.bind(this)
  }

  componentDidMount () {
    mapRef.current.leafletElement.fitBounds(bounds)
    console.log('map zoom : ' + mapRef.current.leafletElement.getZoom())
  }

  onCreatedIAE (e) {
    console.log(e)
  }

  render () {
    return (
      <GameMap
        ref={mapRef}
        handleCreatedIAE={this.onCreatedIAE}
        bounds={bounds}
      />
    )
  }
}

GameBoard.propTypes = {}

export default GameBoard
