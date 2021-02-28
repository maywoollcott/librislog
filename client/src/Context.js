import { useState, createContext } from 'react';

export const Context = createContext();


export const Provider = (props) => {

  const [currentUser, setCurrentUser] = useState({});
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