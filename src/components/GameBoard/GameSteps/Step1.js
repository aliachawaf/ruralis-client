import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Divider, Header, Icon, Segment, Statistic } from 'semantic-ui-react'
import Timer from 'react-compound-timer'

let timerPaused = false

const Step1 = (props) => {
  return (
    <Segment basic padded>
      <Header content='Implantation des IAE' />

      <Container textAlign='justified'>
        Ajoutez les IAE que vous avez choisis sur la carte d'exploitation en utilisant
        les outils de dessin et en vous référant à la légende.
      </Container>

      <Divider hidden />

      <Container>
        <Timer
          initialTime={600000}
          direction='backward'
          startImmediately={false}
          onPause={() => { timerPaused = true }}
          onResume={() => { timerPaused = false }}
        >
          {({ start, resume, pause, reset, getTime }) => (
            <>
              {props.timerLaunched && start()}

              <Icon
                size='huge'
                name={getTime() > 310000 ? 'hourglass one' : getTime() > 61000 ? 'hourglass two' : 'hourglass three'}
              />

              <Divider hidden />

              <Statistic>
                <Statistic.Value>
                  <Timer.Minutes />
                  :
                  <Timer.Seconds formatValue={value => `${(value < 10 ? `0${value}` : value)}`} />
                </Statistic.Value>
              </Statistic>
              <Divider hidden />

              <Button
                onClick={timerPaused ? resume : pause}
                icon={timerPaused ? 'play' : 'pause'}
              />

              <Button onClick={reset} icon='repeat' />

            </>
          )}
        </Timer>
      </Container>

      <Divider hidden />

      <Container>
        <Button onClick={props.onValidateIAEs} content='Valider les IAE' color='red' />
      </Container>
    </Segment>
  )
}

Step1.propTypes = {
  onValidateIAEs: PropTypes.func.isRequired,
  timerLaunched: PropTypes.bool.isRequired
}

Step1.defaultProps = {
  timerLaunched: false
}

Step1.defaultProps = {}

export default Step1
