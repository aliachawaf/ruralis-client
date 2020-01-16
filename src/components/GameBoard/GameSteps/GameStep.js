import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Header, Image, Progress, Segment, Statistic } from 'semantic-ui-react'
import Step1 from './Step1/Step1'
import score from '../../../assets/score.png'
import Step2 from './Step2/Step2'

const GameStep = (props) => (

  <div>
    <Segment.Group stacked>

      <Segment color='red' inverted basic>
        <Header content='Déroulement de la Partie' />
      </Segment>

      <Segment basic>
        <Statistic>
          <Statistic.Label>Tour</Statistic.Label>
          <Statistic.Value>{props.numTour} / 7</Statistic.Value>
        </Statistic>
      </Segment>

      <Divider />

      <Segment basic style={{ position: 'relative' }}>
        <Image src={score} />

        <Header style={{ position: 'absolute', left: '13%', top: '10%' }} content={props.production} />
        <Header style={{ position: 'absolute', left: '35%', top: '10%' }} content={props.tempsTravail} />
        <Header style={{ position: 'absolute', left: '58%', top: '10%' }} content={props.environnement} />
        <Header style={{ position: 'absolute', left: '80%', top: '10%' }} content={props.ancrageSocial} />

      </Segment>

      <Divider />

      {props.currentStep === 1 &&
        <Step1 onValidateIAEs={props.handleValidateIAEs} timerLaunched={props.timerLaunched} />}

      {props.currentStep === 2 &&
        <Step2
          actionsDone={props.actionsDone}
          actionSelected={props.actionSelected}
          onChangeAction={props.onChangeAction}
          onValidateActions={props.handleValidateAction}
        />}

      <Divider />

      <Segment basic>
        <Progress value={props.currentStep} total='3' progress='ratio' color='yellow' />
      </Segment>

    </Segment.Group>
  </div>

)

GameStep.propTypes = {
  currentStep: PropTypes.number.isRequired,
  numTour: PropTypes.number.isRequired,
  // SCORING
  production: PropTypes.number.isRequired,
  environnement: PropTypes.number.isRequired,
  tempsTravail: PropTypes.number.isRequired,
  ancrageSocial: PropTypes.number.isRequired,
  // Step 1
  handleValidateIAEs: PropTypes.func.isRequired,
  timerLaunched: PropTypes.bool.isRequired,
  // Step 2
  actionsDone: PropTypes.array.isRequired,
  actionSelected: PropTypes.number.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  handleValidateAction: PropTypes.func.isRequired
  // Step 3
  // Step 4
}

GameStep.defaultProps = {}

export default GameStep
