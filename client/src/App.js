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

function App() {

  const value = useContext(Context);

  const updateLibrary = async () => {
    const currentUserId = value.currentUser.user;

    if(currentUserId!==null) {
      const books = await axios.get(`http://localhost:5000/auth/${currentUserId}`)
      value.setLibrary(books.data);
      value.setLoadingLib(false);
      console.log(books)
    }
  }

  useEffect ( () => {
      updateLibrary()
  }, [value.currentUser]);

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
