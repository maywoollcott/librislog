import './App.css';
import { Provider } from './Context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Service from './components/Service'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Registration from './components/Registration'

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Service />
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Registration} />
          <Switch>
            <Route exact path='/current' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
