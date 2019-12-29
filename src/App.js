import React from 'react'
import GameBoardContainer from './containers/GameBoard.container'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import HomeRuralis from './components/Home/HomeRuralis'

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/home' component={HomeRuralis} />
          <Route exact path='/game/board' component={GameBoardContainer} />
          <Redirect from='/*' to='/home' />
        </Switch>
      </div>
    </Router>
  )
}

export default App
