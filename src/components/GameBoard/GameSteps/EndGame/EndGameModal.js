import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const EndGameModal = (props) => (

  <Modal
    open={props.opened}
    closeOnDimmerClick={false}
    closeOnEscape={false}
    size='large'
  >

    <Modal.Header>
      <Header
        as='h1'
        icon='smile outline'
        content='Félicitations ! Vous avez terminé la partie'
      />
    </Modal.Header>

    <Modal.Actions>
      <Link to='/home'>
        <Button negative icon='home' content={'Page d\'accueil'} />
      </Link>

      <Link to={'/history/game/' + props.idGame}>
        <Button negative icon='list' content={'Accéder à l\'historique'} />
      </Link>
    </Modal.Actions>

  </Modal>

)

EndGameModal.propTypes = {
  idGame: PropTypes.number.isRequired,
  opened: PropTypes.bool.isRequired
}

export default EndGameModal
