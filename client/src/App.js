import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Service from './components/Service'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Registration from './components/Registration'
import Library from './components/Library'
import { useContext, useEffect }from 'react'
import { Context } from './Context'
import axios from 'axios';
import apiService from './utils/apiService'

function App() {

  const value = useContext(Context);

  const updateLibrary = async () => {

    if (value.isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken');
  
      const books = await apiService.getLibrary(accessToken)
      value.setLibrary(books.data);
    } else {
      value.setLibrary([]);
    }

  }

  useEffect ( () => {
      updateLibrary()
  }, [value.isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="bodydashboard">
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Registration} />
          <Switch>
            <Route exact path='/current' component={Dashboard} />
            <Route exact path='/library' component={Library} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
