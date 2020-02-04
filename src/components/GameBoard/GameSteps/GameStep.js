import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Header, Progress, Segment, Statistic } from 'semantic-ui-react'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import { connect } from 'react-redux'
import GameScore from '../../common/GameScore'
import EndGame from './EndGame/EndGame'

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

      <GameScore
        production={props.game.production}
        tempsTravail={props.game.tempsTravail}
        environnement={props.game.environnement}
        ancrageSocial={props.game.ancrageSocial}
      />

      <Divider />

      {props.game.step === 1 &&
        <Step1 onValidateIAEs={props.handleValidateIAEs} />}

      {props.game.step === 2 &&
        <Step2
          actionSelected={props.actionSelected}
          onChangeAction={props.onChangeAction}
          onValidateActions={props.handleValidateAction}
        />}

      {props.game.numTour === 7 && props.game.step === 4 &&
        <EndGame
          isObjectiveAchieved={props.isObjectiveAchieved}
          onChangeObjectiveAchieved={props.handleOnChangeObjectiveAchieved}
          onChangePlayerWinner={props.handleOnChangePlayerWinner}
          playersWinners={props.playersWinners}
          onValidateEndGame={props.handleOnValidateEndGame}
          victory={props.victory}
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
  // Step 2
  actionSelected: PropTypes.number.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  handleValidateAction: PropTypes.func.isRequired,
  // Step 3
  // End Game
  victory: PropTypes.bool.isRequired,
  isObjectiveAchieved: PropTypes.bool.isRequired,
  playersWinners: PropTypes.array.isRequired,
  handleOnChangeObjectiveAchieved: PropTypes.func.isRequired,
  handleOnChangePlayerWinner: PropTypes.func.isRequired,
  handleOnValidateEndGame: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps
)(GameStep)
