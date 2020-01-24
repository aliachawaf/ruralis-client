import * as types from '../actions/types'

const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_ALL_GAMES: {
      return action.payload.games
    }

    default:
      return state
  }
}

export default gamesReducer
gamesReducer