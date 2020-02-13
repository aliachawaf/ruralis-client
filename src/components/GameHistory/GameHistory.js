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
  const breadcrumbSections = [
    { key: 'history', content: 'Historique', link: true, href: '/history/games', style: { color: '#FFFFFF' } },
    { key: props.game._id, content: props.game._id + '. ' + props.game.name, active: true, as: 'h3' }
  ]

  return (
    <div>
      <RuralisHeader breadcrumbSections={breadcrumbSections} />

      <Segment basic>

        <Grid columns={3} stackable textAlign='center'>

          <Grid.Column width={9}>

            <GameMapHistory
              ref={ref}
              bounds={props.bounds}
            />

          </Grid.Column>

          <Grid.Column width={3}>
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
