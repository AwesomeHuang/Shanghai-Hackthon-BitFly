import React from 'react'
import { Router, Route, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './containers/Home'
import Add from './containers/Add'
import Show from './containers/Show'
import List from './containers/List'
import Detail from './containers/Detail'
import End from './containers/End'

const history = createBrowserHistory()

const router = App => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/add" exact component={Add} />
      <Route path="/list" exact component={List} />
      <Route path="/show" exact component={Show} />
      <Route path="/detail" exact component={Detail} />
      <Route path="/end" exact component={End} />
    </Switch>
  </Router>
)

export default router
