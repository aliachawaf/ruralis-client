import React from 'react'
import PropTypes from 'prop-types'

import { Header, Image, Segment } from 'semantic-ui-react'
import score from '../../assets/score.png'

const GameScore = (props) => (
  <Segment basic style={{ position: 'relative' }}>
    <Image src={score} />
    <Header style={{ position: 'absolute', left: '13%', top: '10%' }} content={props.production} />
    <Header style={{ position: 'absolute', left: '35%', top: '10%' }} content={props.tempsTravail} />
    <Header style={{ position: 'absolute', left: '58%', top: '10%' }} content={props.environnement} />
    <Header style={{ position: 'absolute', left: '80%', top: '10%' }} content={props.ancrageSocial} />
  </Segment>
)

GameScore.propTypes = {
  production: PropTypes.number.isRequired,
  tempsTravail: PropTypes.number.isRequired,
  environnement: PropTypes.number.isRequired,
  ancrageSocial: PropTypes.number.isRequired
}

GameScore.defaultProps = {
  production: 0,
  tempsTravail: 70,
  environnement: 0,
  ancrageSocial: 0
}

export default GameScore
