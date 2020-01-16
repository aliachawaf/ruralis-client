import * as types from '../actions/types'

const gameReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_GAME: {
      return action.payload.game
    }
    default:
      return state
  }
}

export default gameReducer
