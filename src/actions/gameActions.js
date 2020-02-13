import {
  ADD_CARD_EVENTS,
  ADD_IAE,
  APPLY_ACTION,
  CREATE_GAME,
  END_GAME,
  FETCH_ALL_GAMES,
  FETCH_GAME,
  GET_ERRORS,
  START_GAME,
  TMP_SCORE,
  UPDATE_SCORE
} from './types'
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

// _______ FETCH ALL GAMES _______

export const fetchAllGamesAction = games => ({
  type: FETCH_ALL_GAMES,
  payload: {
    games
  }
})

export const fetchAllGames = () => dispatch => {
  const resource = 'api/public/game'

  APIFetch.fetchRuralisAPI(resource, {}, APIFetch.GET)
    .then(res => {
      dispatch(fetchAllGamesAction(res.data.games))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// _______ CREATE GAME _______

export const createGameAction = game => ({
  type: CREATE_GAME,
  payload: {
    game
  }
})

export const createGame = (gameName, playersSelected, scenario, history) => dispatch => {
  const params = {
    name: gameName,
    players: playersSelected,
    scenario: scenario
  }

  const resource = 'api/public/game'

  APIFetch.fetchRuralisAPI(resource, params, APIFetch.POST)
    .then(res => {
      dispatch(createGameAction(res.data.game))
      history.push('/game/board/' + res.data.game._id)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// _______ START GAME _______

export const startGameAction = game => ({
  type: START_GAME,
  payload: {
    game
  }
})

export const startGame = (idGame) => dispatch => {
  const resource = 'api/public/game/' + idGame + '/start'

  APIFetch.fetchRuralisAPI(resource, {}, APIFetch.PUT)
    .then(res => {
      dispatch(startGameAction(res.data.game))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// _______ TMP SCORE _______

export const tmpScoreAction = (production, environnement, ancrageSocial, tempsTravail) => ({
  type: TMP_SCORE,
  payload: {
    newProduction: production,
    newEnvironnement: environnement,
    newAncrageSocial: ancrageSocial,
    newTempsTravail: tempsTravail
  }
})

export const tmpScore = (production, environnement, ancrageSocial, tempsTravail) => dispatch => {
  dispatch(tmpScoreAction(production, environnement, ancrageSocial, tempsTravail))
}

// _______ ADD IAE _______

export const addIAEAction = game => ({
  type: ADD_IAE,
  payload: {
    game
  }
})

export const addIAE = (idGame, IAEs, circleIAEs, production, environnement, ancrageSocial, tempsTravail) => dispatch => {
  const resource = 'api/public/game/' + idGame + '/IAE'

  APIFetch.fetchRuralisAPI(resource, { IAEs: IAEs, circleIAEs: circleIAEs }, APIFetch.POST)
    .then(res => {
      dispatch(updateScore(idGame, production, environnement, ancrageSocial, tempsTravail))
      res.data.game.production = production
      res.data.game.environnement = environnement
      res.data.game.ancrageSocial = ancrageSocial
      res.data.game.tempsTravail = tempsTravail
      dispatch(addIAEAction(res.data.game))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// _______ UPDATE SCORE _______

export const updateScoreAction = game => ({
  type: UPDATE_SCORE,
  payload: {
    game
  }
})

export const updateScore = (idGame, production, environnement, ancrageSocial, tempsTravail) => dispatch => {
  APIFetch.fetchRuralisAPI(
    'api/public/game/' + idGame + '/scoring',
    {
      production: production,
      environnement: environnement,
      ancrageSocial: ancrageSocial,
      tempsTravail: tempsTravail
    },
    APIFetch.PUT)
    .then(res => {
      dispatch(updateScoreAction(res.data.game))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// _______ APPLY ACTION _______

export const applyActionAction = game => ({
  type: APPLY_ACTION,
  payload: {
    game
  }
})

export const applyAction = (idGame, numAction, production, environnement, ancrageSocial, tempsTravail) => dispatch => {
  // Send Action selected to server
  const resource = 'api/public/game/' + idGame + '/action'
  APIFetch.fetchRuralisAPI(
    resource,
    { action: numAction },
    APIFetch.POST
  )
    .then(res => {
      dispatch(updateScore(idGame, production, environnement, ancrageSocial, tempsTravail))
      res.data.game.production = production
      res.data.game.environnement = environnement
      res.data.game.ancrageSocial = ancrageSocial
      res.data.game.tempsTravail = tempsTravail
      dispatch(applyActionAction(res.data.game))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// _______ ENDGAME ACTION _______

export const endgameAction = game => ({
  type: END_GAME,
  payload: {
    game
  }
})

export const endgame = (idGame, victoryObjectif, victoryPlayers, victory) => dispatch => {
  // Send Action selected to server
  const resource = 'api/public/game/' + idGame + '/endgame'
  APIFetch.fetchRuralisAPI(
    resource,
    { victory: victory, victoryObjectif: victoryObjectif, victoryPlayers: victoryPlayers },
    APIFetch.PUT
  )
    .then(res => {
      dispatch(endgameAction(res.data.game))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// _______ ADD CARDS _______

export const addEventCardsAction = game => ({
  type: ADD_CARD_EVENTS,
  payload: {
    game
  }
})

export const addEventCards = (idGame, cards, production, environnement, ancrageSocial, tempsTravail) => dispatch => {
  // Send Action selected to server
  const resource = 'api/public/game/' + idGame + '/eventcards'
  APIFetch.fetchRuralisAPI(
    resource,
    { cardsPicked: cards },
    APIFetch.PUT
  )
    .then(res => {
      dispatch(updateScore(idGame, production, environnement, ancrageSocial, tempsTravail))
      res.data.game.production = production
      res.data.game.environnement = environnement
      res.data.game.ancrageSocial = ancrageSocial
      res.data.game.tempsTravail = tempsTravail
      dispatch(addEventCardsAction(res.data.game))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
