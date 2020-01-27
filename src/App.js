import React from 'react'
import GameBoardContainer from './containers/GameBoard.container'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import HomeRuralis from './components/Home/HomeRuralis'
import GameRules from './components/GameRules/GameRules'
import NewGameContainer from './containers/NewGame.container'
import { Provider } from 'react-redux'
import store from './store'
import PlayerRoleContainer from './containers/Player/PlayerRole.container'
import ListIAEContainer from './containers/Player/ListIAE.container'
import LivretGEAContainer from './containers/Player/LivretGEA.container'
import GameHistoryContainer from './containers/GameHistory.container'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path='/home' component={HomeRuralis} />
            <Route exact path='/game/board/:idGame' component={GameBoardContainer} />
            <Route exact path='/game/new' component={NewGameContainer} />
            <Route exact path='/game/rules' component={GameRules} />
            <Route exact path='/player/:playerNumber/role' component={PlayerRoleContainer} />
            <Route exact path='/player/:playerNumber/IAE' component={ListIAEContainer} />
            <Route exact path='/player/:playerNumber/GEA' component={LivretGEAContainer} />
            <Route exact path='/game/history/:idGame' component={GameHistoryContainer} />
            <Redirect from='/*' to='/home' />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
