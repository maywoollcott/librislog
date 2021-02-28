import './App.css';
import { Provider } from './Context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Service from './components/Service'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Landing from './components/Landing'

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Service />
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/current' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
