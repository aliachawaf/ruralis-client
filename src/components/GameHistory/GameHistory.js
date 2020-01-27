import React from 'react'
import RuralisHeader from '../common/RuralisHeader'
import { Grid, Image, Segment } from 'semantic-ui-react'
import mapInfoLegend from '../../assets/mapLegend/mapInfoLegend.png'
import mapLegend from '../../assets/mapLegend/mapLegend.png'
import GameMapHistory from './GameMapHistory'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GameInfosHistory from './GameInfosHistory'

const GameHistory = React.forwardRef((props, ref) => {
  return (
    <div>
      <RuralisHeader title='Historique des parties' />

      <Segment basic>

        <Grid columns={3} stackable textAlign='center'>

          <Grid.Column width={9}>

            <GameMapHistory
              ref={ref}
              bounds={props.bounds}
            />

          </Grid.Column>

          <Grid.Column width={3} style={{ height: '90vh' }}>
            <Image src={mapLegend} />
            <Image src={mapInfoLegend} />

          </Grid.Column>

          <Grid.Column width={4}>
            <GameInfosHistory />
          </Grid.Column>

        </Grid>
      </Segment>

    </div>
  )
})

GameHistory.propTypes = {
  game: PropTypes.object.isRequired,
  // GameMap
  bounds: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(GameHistory)
