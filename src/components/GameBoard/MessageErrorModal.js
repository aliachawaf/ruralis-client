import React from 'react'
import { Header, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const MessageErrorModal = (props) => (

  <Modal open={props.opened} closeIcon size='large' onClose={props.handleOnClose}>
    <Header
      as='h1'
      icon='warning'
      content={props.message}
    />
  </Modal>

)

MessageErrorModal.propTypes = {
  opened: PropTypes.string.isRequired,
  message: PropTypes.number.isRequired,
  handleOnClose: PropTypes.func.isRequired
}

export default MessageErrorModal
