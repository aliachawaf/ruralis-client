import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  game: gameReducer,
  error: errorReducer
})
