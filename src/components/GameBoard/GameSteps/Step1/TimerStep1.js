import React from 'react'
import { Button, Header, Icon, Modal, Statistic } from 'semantic-ui-react'
import Timer from 'react-compound-timer'

let timerPaused = true

const TimerStep1 = () => (
  <Timer
    initialTime={600000}
    direction='backward'
    startImmediately={false}
    onPause={() => { timerPaused = true }}
    onResume={() => { timerPaused = false }}
  >
    {({ resume, pause, reset, getTime }) => (
      <>
        <Statistic>
          <Statistic.Value>
            <Icon
              size='small'
              name={getTime() > 301000 ? 'hourglass one' : getTime() > 61000 ? 'hourglass two' : 'hourglass three'}
            />
            <Timer.Minutes />
            :
            <Timer.Seconds formatValue={value => `${(value < 10 ? `0${value}` : value)}`} />
          </Statistic.Value>
        </Statistic>

        <div>
          <Button onClick={timerPaused ? resume : pause} icon={timerPaused ? 'play' : 'pause'} />
          <Button onClick={reset} icon='repeat' />
        </div>

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

export default TimerStep1
