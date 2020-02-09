import React from 'react'
import PropTypes from 'prop-types'

import 'leaflet-polylinedecorator'
import L from 'leaflet'
import { FeatureGroup, ImageOverlay, Map, ScaleControl, ZoomControl } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import gameMap from '../../../assets/gameMap.png'
import 'leaflet-draw/dist/leaflet.draw.css'

import mapLegend from '../../../config/mapLegend'
import { connect } from 'react-redux'
import IaeDrawing from './IaeDrawing'
import Control from 'react-leaflet-control'
import { Button } from 'semantic-ui-react'
import BosquetDrawing from './BosquetDrawing'
import MareDrawing from './MareDrawing'

const GameMap = React.forwardRef((props, ref) => {
  const {
    bounds,
    onCreatedIAE,
    iaeImplemented,
    iaeMarkerImplemented,
    iaeGroupSelected,
    iaeAlreadyImplemented,
    iaeMarkerAlreadyImplemented,
    clearAllIAEs,
    handleonChangeDeleting,
    handleDeleteIAE,
    handleValidateDeletingIAE,
    handleCancelDeletingIAE,
    removeMarkersIAEdeleted
  } = props

  const iaeSelectedDrawingType = mapLegend[iaeGroupSelected].drawingType

  return (
    <Map
      ref={ref}
      style={{ height: '90vh' }}
      crs={L.CRS.Simple}
      minZoom={-5}
      zoomSnap={0}
      zoomControl={false}
      attributionControl={false}
      onMovestart={() => removeMarkersIAEdeleted()}
      onMoveend={() => removeMarkersIAEdeleted()}
      onMove={() => removeMarkersIAEdeleted()}

    >

      {/* GAME MAP IMAGE */}
      <ImageOverlay
        url={gameMap}
        bounds={bounds}
      />

      {/* MAP SCALE */}
      <ScaleControl imperial={false} position='bottomright' />

      {/* BUTTON TO CLEAR ALL IAE DRAWINGS */}
      {
        props.game.step === 1 &&
          <Control position='topright'>
            <Button
              disabled={iaeImplemented.length === 0 && iaeMarkerImplemented.length === 0}
              icon='trash alternate outline' content='Tout Effacer' color='grey'
              onClick={clearAllIAEs}
            />
          </Control>
      }

      {/* BUTTON TO RECENTER MAP */}
      <Control position='topleft'>
        <Button
          icon='expand' content='Recentrer' color='grey'
          onClick={() => ref.current.leafletElement.fitBounds(bounds)}
        />
      </Control>

      {/* ZOOM CONTROL */}
      <ZoomControl />

      {/* DRAWING TOOLTIP */}
      {props.game.step === 1 &&
        <FeatureGroup>
          <EditControl
            position='topright'
            onCreated={e => { onCreatedIAE(e) }}
            onDrawStart={() => handleonChangeDeleting(false)}
            onDeleteStart={() => handleonChangeDeleting(true)}
            onDeleteStop={() => handleCancelDeletingIAE()}
            onDeleted={() => handleValidateDeletingIAE()}
            draw={{
              marker: false,
              circle: false,
              polyline: (iaeSelectedDrawingType === 'polyline' ? { repeatMode: true } : false),
              polygon: (iaeSelectedDrawingType === 'polygon') ? { repeatMode: true, showLength: true } : false,
              rectangle: (iaeSelectedDrawingType === 'polygon' ? { repeatMode: true } : false),
              circlemarker: (iaeSelectedDrawingType === 'circlemarker' ? { repeatMode: true } : false)
            }}
            edit={{
              edit: false
            }}
          />
        </FeatureGroup>}

      {/* IAE ALREADY IMPLEMENTED DRAWINGS */}
      {
        iaeAlreadyImplemented.map((iae, index) => <IaeDrawing key={index} iae={iae} handleDeleteIAE={handleDeleteIAE} />)
      }
      {
        iaeMarkerAlreadyImplemented
          .filter(iae => mapLegend[iae.IAEGroup].iaeGroup === 'Bosquet')
          .map((iae, index) => <BosquetDrawing key={index} iae={iae} handleDeleteIAE={handleDeleteIAE} />)
      }

      {
        iaeMarkerAlreadyImplemented
          .filter(iae => mapLegend[iae.IAEGroup].iaeGroup === 'Mares')
          .map((iae, index) => <MareDrawing key={index} iae={iae} handleDeleteIAE={handleDeleteIAE} />)
      }

      {/* NEW IAE IMPLEMENTED DRAWINGS */}
      {
        iaeImplemented.map((iae, index) => <IaeDrawing key={index} iae={iae} handleDeleteIAE={handleDeleteIAE} />)
      }

      {
        iaeMarkerImplemented
          .filter(iae => mapLegend[iae.IAEGroup].iaeGroup === 'Bosquet')
          .map((iae, index) => <BosquetDrawing key={index} iae={iae} handleDeleteIAE={handleDeleteIAE} />)
      }

      {
        iaeMarkerImplemented
          .filter(iae => mapLegend[iae.IAEGroup].iaeGroup === 'Mares')
          .map((iae, index) => <MareDrawing key={index} iae={iae} handleDeleteIAE={handleDeleteIAE} />)
      }

    </Map>
  )
})

GameMap.propTypes = {
  game: PropTypes.object.isRequired,
  bounds: PropTypes.array.isRequired,
  onCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  iaeMarkerImplemented: PropTypes.array.isRequired,
  iaeGroupSelected: PropTypes.number.isRequired,
  iaeAlreadyImplemented: PropTypes.array.isRequired,
  iaeMarkerAlreadyImplemented: PropTypes.array.isRequired,
  clearAllIAEs: PropTypes.func.isRequired,
  handleonChangeDeleting: PropTypes.func.isRequired,
  handleDeleteIAE: PropTypes.func.isRequired,
  handleValidateDeletingIAE: PropTypes.func.isRequired,
  handleCancelDeletingIAE: PropTypes.func.isRequired,
  removeMarkersIAEdeleted: PropTypes.func.isRequired
}

GameMap.defaultProps = {
  iaeImplemented: [],
  iaeMarkerImplemented: [],
  iaeGroupSelected: 0,
  iaeAlreadyImplemented: [],
  iaeMarkerAlreadyImplemented: []
}

const mapStateToProps = state => ({
  game: state.game,
  iaeAlreadyImplemented: state.game.implementedIAE,
  iaeMarkerAlreadyImplemented: state.game.circleIAEs
})

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(GameMap)
