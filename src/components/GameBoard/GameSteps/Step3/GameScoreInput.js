import React from 'react'
import PropTypes from 'prop-types'

import { Image, Segment } from 'semantic-ui-react'
import score from '../../../../assets/score.png'

const GameScoreInput = (props) => (
  <Segment basic style={{ position: 'relative' }}>
    <Image src={score} />
    <input
      type='number'
      min={0}
      style={{ position: 'absolute', left: '10%', top: '35%', width: '33px' }}
      value={props.production}
      onChange={(e) => props.onChangeScore(e.target.value, props.tempsTravail, props.environnement, props.ancrageSocial)}
    />

    <input
      type='number'
      min={0}
      style={{ position: 'absolute', left: '33%', top: '35%', width: '33px' }}
      value={props.tempsTravail}
      onChange={(e) => props.onChangeScore(props.production, e.target.value, props.environnement, props.ancrageSocial)}
    />

    <input
      type='number'
      min={0}
      style={{ position: 'absolute', left: '56%', top: '35%', width: '33px' }}
      value={props.environnement}
      onChange={(e) => props.onChangeScore(props.production, props.tempsTravail, e.target.value, props.ancrageSocial)}
    />

    <input
      type='number'
      min={0}
      style={{ position: 'absolute', left: '78%', top: '35%', width: '33px' }}
      value={props.ancrageSocial}
      onChange={(e) => props.onChangeScore(props.production, props.tempsTravail, props.environnement, e.target.value)}
    />
  </Segment>
)

GameScoreInput.propTypes = {
  production: PropTypes.number.isRequired,
  tempsTravail: PropTypes.number.isRequired,
  environnement: PropTypes.number.isRequired,
  ancrageSocial: PropTypes.number.isRequired,
  onChangeScore: PropTypes.func.isRequired
}

GameScoreInput.defaultProps = {
  production: 0,
  tempsTravail: 70,
  environnement: 0,
  ancrageSocial: 0
}

export default GameScoreInput
