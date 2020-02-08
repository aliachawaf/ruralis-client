import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Image, Menu } from 'semantic-ui-react'
import logo from '../../assets/logos/ruralisLogo.png'
import { Link } from 'react-router-dom'
import playersList from '../../config/playersList'

const PlayerHeader = (props) => {
  const playerInfos = playersList.find(p => p.number === props.playerNumber)
  const color = playerInfos.color
  const isFarmer = playerInfos.role === 'agriculteur'

  return (

    <Menu fixed='top' icon='labeled' inverted size='tiny' style={{ backgroundColor: color }}>
      <Menu.Item>
        <Link to='/home'>
          <Image src={logo} size='mini' />
        </Link>
      </Menu.Item>

      <Link to={'/player/' + props.playerNumber + '/role'}>
        <Menu.Item link active={props.activeTab === 'role'}>
          <Icon name='user' />
          Mon rôle
        </Menu.Item>
      </Link>

      <Link to={'/player/' + props.playerNumber + '/IAE'}>
        <Menu.Item link active={props.activeTab === 'IAE'}>
          <Icon name='tree' />
          IAE
        </Menu.Item>
      </Link>

      {
        isFarmer &&
          <Link to={'/player/' + props.playerNumber + '/GEA'}>
            <Menu.Item link active={props.activeTab === 'GEA'}>
              <Icon name='book' />
            GEA
            </Menu.Item>
          </Link>
      }

    </Menu>
  )
}

PlayerHeader.propTypes = {
  playerNumber: PropTypes.number.isRequired,
  activeTab: PropTypes.string.isRequired
}

PlayerHeader.defaultProps = {
  activeTab: 'role'
}

export default PlayerHeader
