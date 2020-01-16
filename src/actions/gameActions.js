import { FETCH_GAME, GET_ERRORS } from './types'
import * as APIFetch from '../helpers/APIFetch'

// _______ FETCH ONE GAME _______

export const fetchGameAction = game => ({
  type: FETCH_GAME,
  payload: {
    game
  }
})

export const fetchGame = (idGame) => dispatch => {
  const resource = 'api/public/game/' + idGame

  APIFetch.fetchRuralisAPI(resource, {}, APIFetch.GET)
    .then(res => {
      dispatch(fetchGameAction(res.data.game))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
