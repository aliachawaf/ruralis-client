import React from 'react'
import PropTypes from 'prop-types'
import { Header, Segment } from 'semantic-ui-react'
import Step1 from './Step1'

const GameStep = (props) => (

  <div>
    <Segment.Group stacked>

      <Segment color='red' inverted basic>
        <Header content='Déroulement de la Partie' />
      </Segment>

      <Segment>
        SCORE
      </Segment>

      {props.currentStep === 1 && <Step1 onValidateIAEs={props.onValidateIAEs} />}

      <Segment>
        Progress bar
      </Segment>

    </Segment.Group>
  </div>

)

GameStep.propTypes = {
  currentStep: PropTypes.number.isRequired,
  // Step 1
  handleValidateIAEs: PropTypes.func.isRequired
  // Step 2
  // Step 3
  // Step 4
}

GameStep.defaultProps = {}

export default GameStep
