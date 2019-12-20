import React from 'react'
import { Header, Image, Segment } from 'semantic-ui-react'
import logo from '../../assets/ruralisLogo.png'
import PropTypes from 'prop-types'

const RuralisHeader = (props) => {
  const { title } = props
  return (
    <Segment color='red' inverted basic>
      <Header>
        <Image src={logo} />
        {title}
      </Header>
    </Segment>
  )
}

RuralisHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default RuralisHeader
