import React from 'react'
import Landing from './Landing'
import Registration from './Registration'
import Library from './Library'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard'

const BodyDashboard = () => {
  return (
    <div>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Registration} />
        <Switch>
          <Route exact path='/current' component={Dashboard} />
          <Route exact path='/library' component={Library} />
        </Switch>
    </div>
  )
}

export default BodyDashboard
