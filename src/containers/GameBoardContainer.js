import React from 'react'

import GameBoard from '../components/GameBoard/GameBoard'

const bounds = [[0, 0], [900, 1050]]
const mapRef = React.createRef()

class GameBoardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      iaeImplemented: [],
      iaeTypeSelected: ''
    }
    this.onCreatedIAE = this.onCreatedIAE.bind(this)
    this.onIAETypeChange = this.onIAETypeChange.bind(this)
  }

  componentDidMount () {
    mapRef.current.leafletElement.fitBounds(bounds)
  }

  onCreatedIAE (e) {
    console.log(e)
    const newIAE =
      {
        color: this.state.iaeTypeSelected,
        positions: e.layer._latlngs
      }

    this.setState({
      iaeImplemented: this.state.iaeImplemented.concat(newIAE)
    })
  }

  onIAETypeChange (e) {
    console.log('change ' + e.target.value)
    this.setState({ iaeTypeSelected: e.target.value })
  }

  render () {
    return (

      <GameBoard
        ref={mapRef}
        bounds={bounds}
        handleCreatedIAE={this.onCreatedIAE}
        iaeTypeSelected={this.state.iaeTypeSelected}
        handleIAETypeChange={this.onIAETypeChange}
        iaeImplemented={this.state.iaeImplemented}
      />
    )
  }
}

GameBoardContainer.propTypes = {}

export default GameBoardContainer
