import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CurrentlyReading from './components/CurrentlyReading'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Registration from './components/Registration'
import Library from './components/Library'
import { useContext, useEffect }from 'react'
import { Context } from './Context'
import apiService from './utils/apiService'
import AddBookManually from './components/AddBookManually'
import AddBookWithApi from './components/AddBookWithApi'
import Stats from './components/Stats'

function App() {

  const value = useContext(Context);

  const updateLibraryAndSessions = async () => {

    if (value.isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken');
  
      const info = await apiService.getUserInfo(accessToken)
      value.setLibrary(info.data.books);
      value.setSessions(info.data.sessions);
      value.setStreak(info.data.streak)

    } else {
      value.setLibrary([]);
      value.setSessions([]);
    }

  }

  useEffect ( () => {
      updateLibraryAndSessions()
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="bodydashboard">
          <Route exact path='/' component={Landing} />
          <Route exact path='/addbookmanually' component={AddBookManually} />
          <Route exact path='/addbook' component={AddBookWithApi} />
          <Route exact path='/register' component={Registration} />
          <Switch>
            <Route exact path='/current' component={CurrentlyReading} />
            <Route exact path='/library' component={Library} />
            <Route exact path='/stats' component={Stats} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
