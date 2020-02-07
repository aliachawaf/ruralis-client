import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Divider, Header, Image, Segment, Statistic, Transition } from 'semantic-ui-react'
import { connect } from 'react-redux'
import eventCards from '../../../../config/eventCards'
import { versoEventCard } from '../../../../assets/eventCards'

const Step3 = (props) => {
  const numberLastCardPicked = props.cardsPicked[props.cardsPicked.length - 1]
  const lastCardPicked = eventCards.find(c => c.numCard === numberLastCardPicked)

  return (
    <Segment basic padded>
      <Header content='Tirage de cartes événement' />

      <Divider hidden />

      <p>
        Une fois une carte tirée, vous pouvez
      </p>

      <Container>

        <Transition.Group
          visible={props.cardsPicked.length !== 0}
          animation='horizontal flip'
          duration={1000}
        >

          {props.cardsPicked.length === 0 &&
            <Image src={versoEventCard} centered size='medium' />}

          {props.cardsPicked.length === 1 &&
            <Image src={lastCardPicked && lastCardPicked.cardPicture} centered size='medium' />}
          {props.cardsPicked.length === 2 &&
            <Image src={lastCardPicked && lastCardPicked.cardPicture} centered size='medium' />}
          {props.cardsPicked.length === 3 &&
            <Image src={lastCardPicked && lastCardPicked.cardPicture} centered size='medium' />}

        </Transition.Group>

      </Container>

      <Statistic size='mini'>
        <Statistic.Label>carte</Statistic.Label>
        <Statistic.Value> {props.cardsPicked.length} / 3</Statistic.Value>
      </Statistic>

      <br />

      {
        props.cardsPicked.length === 3
          ? <Button content='Tour suivant' color='red' onClick={props.onValidateEventCards} />
          : <Button content='Tirer une carte' onClick={props.handleOnPickCard} />
      }

    </Segment>
  )
}

Step3.propTypes = {
  game: PropTypes.object.isRequired,
  handleOnPickCard: PropTypes.func.isRequired,
  cardsPicked: PropTypes.number.isRequired,
  onValidateEventCards: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps
)(Step3)
