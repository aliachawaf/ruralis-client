import React from 'react'
import LivretGEA from '../../components/Player/LivretGEA'
import actions from '../../config/actionsCards'

class LivretGEAContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeCardsIndex: [],
      allCardsOpened: false
    }

    this.onChangeAccordion = this.onChangeAccordion.bind(this)
    this.onClickOpenAllCards = this.onClickOpenAllCards.bind(this)
  }

  /**
   * Called when an element of Accordion Cards is clicked
   * @param value : contains the index od the card clicked
   */
  onChangeAccordion (value) {
    const activeCardsIndex = this.state.activeCardsIndex

    if (activeCardsIndex.includes(value.index)) {
      // Remove it from active indexes
      this.setState({
        activeCardsIndex: activeCardsIndex.filter((_, i) => i !== activeCardsIndex.indexOf(value.index))
      })
    } else {
      // Add it in active indexes list
      this.setState({ activeCardsIndex: activeCardsIndex.concat(value.index) })
    }
  }

  onClickOpenAllCards () {
    const allCardsOpened = this.state.allCardsOpened

    if (allCardsOpened) {
      // We close all the cards by removing them from active indexes
      this.setState({ activeCardsIndex: [] })
    } else {
      // We open all the cards by adding them all in active indexes
      this.setState({ activeCardsIndex: [...Array(actions.length).keys()] })
    }

    this.setState({ allCardsOpened: !allCardsOpened })
  }

  render () {
    const playerNumber = Number(this.props.match.params.playerNumber)

    return (
      <LivretGEA
        playerNumber={playerNumber}
        activeCardsIndex={this.state.activeCardsIndex}
        handleOnChangeAccordion={this.onChangeAccordion}
        handleOpenAllCards={this.onClickOpenAllCards}
        allCardsOpened={this.state.allCardsOpened}
      />
    )
  }
}

export default LivretGEAContainer
