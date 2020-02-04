import * as types from '../actions/types'

const gameReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_GAME: {
      return action.payload.game
    }
    case types.START_GAME: {
      return action.payload.game
    }
    case types.ADD_IAE: {
      return action.payload.game
    }
    case types.UPDATE_SCORE: {
      return action.payload.game
    }
    case types.APPLY_ACTION: {
      return action.payload.game
    }
    case types.END_GAME: {
      return action.payload.game
    }
    case types.TMP_SCORE: {
      return Object.assign({}, state, {
        production: action.payload.newProduction,
        tempsTravail: action.payload.newTempsTravail,
        ancrageSocial: action.payload.newAncrageSocial,
        environnement: action.payload.newEnvironnement
      })
    }

    default:
      return state
  }
}

export default gameReducer
