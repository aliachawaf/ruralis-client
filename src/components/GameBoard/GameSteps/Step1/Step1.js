import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Divider, Header, Segment } from 'semantic-ui-react'
import Description from './Description'

const Step1 = (props) => {
  return (
    <Segment basic padded>
      <Header content='Implantation des IAE' />

      <Divider hidden />

      <Container>
        <Description />
      </Container>

      <Divider hidden />

      <Container>
        <Button onClick={props.onValidateIAEs} content='Valider les IAE' color='red' />
      </Container>
    </Segment>
  )
}

Step1.propTypes = {
  onValidateIAEs: PropTypes.func.isRequired
}

export default Step1
