import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Header, Image, Progress, Segment, Statistic } from 'semantic-ui-react'
import Step1 from './Step1/Step1'
import score from '../../../assets/score.png'
import Step2 from './Step2/Step2'
import { connect } from 'react-redux'

const GameStep = (props) => (

  <div>
    <Segment.Group stacked>

      <Segment color='red' inverted basic>
        <Header content='Déroulement de la Partie' />
      </Segment>

      <Segment basic>
        <Statistic>
          <Statistic.Label>Tour</Statistic.Label>
          <Statistic.Value>{props.game.numTour} / 7</Statistic.Value>
        </Statistic>
      </Segment>

      <Divider />

      <Segment basic style={{ position: 'relative' }}>
        <Image src={score} />

        <Header style={{ position: 'absolute', left: '13%', top: '10%' }} content={props.game.production} />
        <Header style={{ position: 'absolute', left: '35%', top: '10%' }} content={props.game.tempsTravail} />
        <Header style={{ position: 'absolute', left: '58%', top: '10%' }} content={props.game.environnement} />
        <Header style={{ position: 'absolute', left: '80%', top: '10%' }} content={props.game.ancrageSocial} />

      </Segment>

      <Divider />

      {props.game.step === 1 &&
        <Step1 onValidateIAEs={props.handleValidateIAEs} timerLaunched={props.timerLaunched} />}

      {props.game.step === 2 &&
        <Step2
          actionSelected={props.actionSelected}
          onChangeAction={props.onChangeAction}
          onValidateActions={props.handleValidateAction}
        />}

      <Divider />

      <Segment basic>
        <Progress value={props.game.step} total='3' progress='ratio' color='yellow' />
      </Segment>

    </Segment.Group>
  </div>

)

GameStep.propTypes = {
  game: PropTypes.object.isRequired,
  // Step 1
  handleValidateIAEs: PropTypes.func.isRequired,
  timerLaunched: PropTypes.bool.isRequired,
  // Step 2
  actionSelected: PropTypes.number.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  handleValidateAction: PropTypes.func.isRequired
  // Step 3
  // Step 4
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps
)(GameStep)
