import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Divider, Header, Segment } from 'semantic-ui-react'

const Step1 = (props) => {
  return (
    <Segment>
      <Header content='Implantation des IAE' />

      <Container>
        <p>
          Ajoutez les IAE que vous avez choisis sur la carte d'exploitation en utilisant
          les outils de dessin et en vous référant à la légende.
        </p>
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

Step1.defaultProps = {}

export default Step1
