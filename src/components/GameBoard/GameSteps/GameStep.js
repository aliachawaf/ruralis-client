import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, Header, Progress, Segment, Statistic } from 'semantic-ui-react'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import { connect } from 'react-redux'
import GameScore from '../../common/GameScore'
import EndGame from './EndGame/EndGame'
import GameScoreInput from './Step3/GameScoreInput'
import Step3 from './Step3/Step3'

const GameStep = (props) => (

  <div>
    <Segment.Group stacked>

      <Segment color='red' inverted basic>
        <Header content='Déroulement de la Partie' />
      </Segment>

      {/** TOUR NUMBER SECTION **/}
      <Segment basic>
        <Statistic size='small'>
          <Statistic.Label>Tour</Statistic.Label>
          <Statistic.Value>{props.game.numTour} / 7</Statistic.Value>
        </Statistic>
      </Segment>

      {/** SCORE SECTION **/}
      {
        props.game.step === 3
          ? <GameScoreInput
            production={props.game.production}
            tempsTravail={props.game.tempsTravail}
            environnement={props.game.environnement}
            ancrageSocial={props.game.ancrageSocial}
            onChangeScore={props.handleOnChangeScore}
            /> // eslint-disable-line
          : <GameScore
            production={props.game.production}
            tempsTravail={props.game.tempsTravail}
            environnement={props.game.environnement}
            ancrageSocial={props.game.ancrageSocial}
            /> // eslint-disable-line
      }

      <Divider />

      {/** STEPS SECTION **/}
      {!props.endGameClicked && props.game.step === 1 &&
        <Step1 onValidateIAEs={props.handleValidateIAEs} />}

      {!props.endGameClicked && props.game.step === 2 &&
        <Step2
          actionSelected={props.actionSelected}
          onChangeAction={props.onChangeAction}
          onValidateActions={props.handleValidateAction}
        />}

      {!props.endGameClicked && props.game.step === 3 &&
        <Step3
          handleOnPickCard={props.pickCard}
          cardsPicked={props.cardsPicked}
          onValidateEventCards={props.handleOnValidateEventCards}
        />}

      {(props.endGameClicked || (props.game.numTour === 7 && props.game.step === 4)) &&
        <EndGame
          isObjectiveAchieved={props.isObjectiveAchieved}
          onChangeObjectiveAchieved={props.handleOnChangeObjectiveAchieved}
          onChangePlayerWinner={props.handleOnChangePlayerWinner}
          playersWinners={props.playersWinners}
          onValidateEndGame={props.handleOnValidateEndGame}
          victory={props.victory}
          endGameClicked={props.endGameClicked}
          onEndGameClicked={props.onEndGameClicked}
        />}

      <Divider />

      <Segment basic>
        <Progress value={props.game.step} total='3' progress='ratio' color='yellow' />
        {!props.endGameClicked && <Button content='Terminer la partie' onClick={props.onEndGameClicked} />}
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
  handleOnChangeScore: PropTypes.func.isRequired,
  pickCard: PropTypes.func.isRequired,
  cardsPicked: PropTypes.array.isRequired,
  handleOnValidateEventCards: PropTypes.func.isRequired,
  // End Game
  victory: PropTypes.bool.isRequired,
  isObjectiveAchieved: PropTypes.bool.isRequired,
  playersWinners: PropTypes.array.isRequired,
  handleOnChangeObjectiveAchieved: PropTypes.func.isRequired,
  handleOnChangePlayerWinner: PropTypes.func.isRequired,
  handleOnValidateEndGame: PropTypes.func.isRequired,
  endGameClicked: PropTypes.bool.isRequired,
  onEndGameClicked: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps
)(GameStep)
