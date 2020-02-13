import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'
/** Components **/
import HomeRuralis from './components/Home/HomeRuralis'
import GameRules from './components/GameRules/GameRules'
import JoinPlayerCards from './components/Join/JoinPlayerCards'
/** Containers **/
import GameBoardContainer from './containers/GameBoard.container'
import NewGameContainer from './containers/NewGame.container'
import JoinGameContainer from './containers/JoinGame.container'
import PlayerRoleContainer from './containers/Player/PlayerRole.container'
import ListIAEContainer from './containers/Player/ListIAE.container'
import LivretGEAContainer from './containers/Player/LivretGEA.container'
import GameHistoryContainer from './containers/GameHistory.container'
import AllGamesHistoryContainer from './containers/AllGamesHistory.container'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path='/home' component={HomeRuralis} />
            <Route exact path='/game/board/:idGame' component={GameBoardContainer} />
            <Route exact path='/new/game' component={NewGameContainer} />
            <Route exact path='/join/game' component={JoinGameContainer} />
            <Route exact path='/join/playerCards' component={JoinPlayerCards} />
            <Route exact path='/game/rules' component={GameRules} />
            <Route exact path='/player/:playerNumber' component={PlayerRoleContainer} />
            <Route exact path='/player/:playerNumber/role' component={PlayerRoleContainer} />
            <Route exact path='/player/:playerNumber/IAE' component={ListIAEContainer} />
            <Route exact path='/player/:playerNumber/GEA' component={LivretGEAContainer} />
            <Route exact path='/history/games' component={AllGamesHistoryContainer} />
            <Route exact path='/history/game/:idGame' component={GameHistoryContainer} />
            <Redirect from='/*' to='/home' />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
