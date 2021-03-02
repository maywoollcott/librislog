import { useState, createContext } from 'react';

export const Context = createContext();


export const Provider = (props) => {

  const [currentUser, setCurrentUser] = useState({
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null
  });

  const [library, setLibrary] = useState([]);
  const [loadingLib, setLoadingLib] = useState(true);
  const [count, setCount] = useState(true);

  const hello = 'howdy'


  return (
    <Context.Provider value={{
      currentUser: currentUser,
      setCurrentUser: setCurrentUser,
      library: library,
      setLibrary: setLibrary,
      loadingLib: loadingLib,
      setLoadingLib: setLoadingLib,
      hello: hello,
      count: count,
      setCount: setCount
    }}>
      {props.children}
    </Context.Provider>
  );
}