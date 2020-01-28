import React from 'react'
import { Breadcrumb, Header, Image, Segment } from 'semantic-ui-react'
import logo from '../../assets/ruralisLogo.png'
import PropTypes from 'prop-types'

const homeSection = [{ key: 'home', content: 'Home', link: true, href: '/home', style: { color: '#FFFFFF' } }]

const RuralisHeader = (props) => {
  return (
    <Segment color='red' inverted basic>
      <Header>
        <Image as='a' src={logo} href='/home' spaced='right' />
        <Breadcrumb
          icon='right angle'
          sections={homeSection.concat(props.breadcrumbSections)}
        />
      </Header>
    </Segment>
  )
}

RuralisHeader.propTypes = {
  breadcrumbSections: PropTypes.array.isRequired
}

export default RuralisHeader
