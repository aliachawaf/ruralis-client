import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Container, Divider, Form, Header, Image, Popup, Segment } from 'semantic-ui-react'
import actions from '../../../../config/actionsCards'
import { connect } from 'react-redux'

const Step2 = (props) => {
  return (
    <Segment basic padded>
      <Header content='Action du livret GEA' />

      <Divider hidden />

      <p>Joueurs-agriculteurs, souhaitez-vous débloquer une action du livret GEA ?</p>

      <Divider hidden />

      <Container textAlign='left'>
        <Form>
          {
            actions.filter(a => !props.game.actionsDone.includes(a.numCard)
            )
              .map(a => {
                const conditionsNotRespected =
                    props.game.environnement < a.environnementCondition ||
                    props.game.production < a.productionCondition ||
                    props.game.ancrageSocial < a.ancrageSocialCondition ||
                    props.game.tempsTravail < a.tempsTravailCondition

                const finalScoreNegative =
                    (props.game.environnement + a.environnementEffect) < 0 ||
                    (props.game.production + a.productionEffect) < 0 ||
                    (props.game.ancrageSocial + a.ancrageSocialEffect) < 0 ||
                    (props.game.tempsTravail + a.tempsTravailEffect) < 0

                return (
                  <Form.Field key={a.numCard}>
                    <Popup
                      wide
                      position='top left'
                      content={<Image src={a.cardPicture} />}
                      trigger={
                        <Checkbox
                          radio
                          disabled={conditionsNotRespected || finalScoreNegative}
                          label={a.numCard + '. ' + a.title}
                          value={a.numCard}
                          checked={props.actionSelected === a.numCard}
                          onClick={!conditionsNotRespected && !finalScoreNegative && props.onChangeAction}
                        />
                      }
                    />
                  </Form.Field>
                )
              }
              )
          }
        </Form>
      </Container>

      <Divider hidden />

      <Button
        onClick={props.onValidateActions}
        content={props.actionSelected === -1 ? 'Pas d\'action' : 'Appliquer l\'action ' + props.actionSelected}
        color='red'
      />
    </Segment>
  )
}

Step2.propTypes = {
  game: PropTypes.object.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  actionSelected: PropTypes.number.isRequired,
  onValidateActions: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps
)(Step2)
