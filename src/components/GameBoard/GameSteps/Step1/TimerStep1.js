import React from 'react'
import { Button, Divider, Header, Icon, Modal, Statistic } from 'semantic-ui-react'
import Timer from 'react-compound-timer'
import PropTypes from 'prop-types'

let timerPaused = false

const TimerStep1 = (props) => (
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

        {
          getTime() < 1 &&
            <Modal
              defaultOpen
              closeIcon
              size='large'
            >
              <Header
                as='h1'
                icon='hourglass three'
                content={'Les 10 minutes se sont écoulées ! Il est temps de dessiner l\'IAE choisie.'}
              />
              <Modal.Content>
                <h4>
                Si aucune décision n'a été prise dans le groupe, ce sont les agriculteurs qui ont le dernier mot.
                </h4>
              </Modal.Content>
            </Modal>
        }
      </>
    )}
  </Timer>
)

TimerStep1.propTypes = {
  timerLaunched: PropTypes.bool.isRequired
}

TimerStep1.defaultProps = {
  timerLaunched: false
}

export default TimerStep1
