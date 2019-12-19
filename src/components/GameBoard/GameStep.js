import React from 'react'
import PropTypes from 'prop-types'

const GameStep = (props) => (

  <div>
    Game Step
    <button onClick={props.onValidateIAEs}>Valider les IAE</button>
  </div>

)

GameStep.propTypes = {
  onValidateIAEs: PropTypes.func.isRequired
}

GameStep.defaultProps = {
}

export default GameStep
