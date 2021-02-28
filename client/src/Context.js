import { useState, createContext } from 'react';

export const Context = createContext();


export const Provider = (props) => {

  const [currentUser, setCurrentUser] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  });
  
  const [library, setLibrary] = useState([]);

  const hello = 'howdy'


  return (
    <Context.Provider value={{
      currentUser: currentUser,
      setCurrentUser: setCurrentUser,
      library: library,
      setLibrary: setLibrary,
      hello: hello
    }}>
      {props.children}
    </Context.Provider>
  );
}