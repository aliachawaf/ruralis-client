import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Header, Progress, Segment } from 'semantic-ui-react'
import Step1 from './Step1'

const GameStep = (props) => (

  <div>
    <Segment.Group stacked>

      <Segment color='red' inverted basic>
        <Header content='Déroulement de la Partie' />
      </Segment>

      <Segment basic>
        SCORE
      </Segment>

      <Divider />

      {props.currentStep === 1 && <Step1 onValidateIAEs={props.onValidateIAEs} timerLaunched={props.timerLaunched} />}

      <Divider />

      <Segment basic>
        <Progress value={props.currentStep} total='3' progress='ratio' color='yellow' />
      </Segment>

    </Segment.Group>
  </div>

)

GameStep.propTypes = {
  currentStep: PropTypes.number.isRequired,
  // Step 1
  handleValidateIAEs: PropTypes.func.isRequired,
  timerLaunched: PropTypes.bool.isRequired
  // Step 2
  // Step 3
  // Step 4
}

GameStep.defaultProps = {}

export default GameStep
