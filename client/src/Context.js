import { useState, createContext } from 'react';
import auth from './utils/auth'

export const Context = createContext();


export const Provider = (props) => {

  const [currentUser, setCurrentUser] = useState({
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null
  });

  const [library, setLibrary] = useState([]);

  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [haveToken, setHaveToken] = useState(false);


  return (
    <Context.Provider value={{
      currentUser: currentUser,
      setCurrentUser: setCurrentUser,
      library: library,
      setLibrary: setLibrary,
      isAuthenticated, isAuthenticated,
      setIsAuthenticated, setIsAuthenticated,
      haveToken: haveToken,
      setHaveToken, setHaveToken
    }}>
      {props.children}
    </Context.Provider>
  );
}