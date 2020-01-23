import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import errorReducer from './errorReducer'
import gamesReducer from './gamesReducer'

export default combineReducers({
  game: gameReducer,
  games: gamesReducer,
  error: errorReducer
})
