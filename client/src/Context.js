import { useState, createContext } from 'react';
export const Context = createContext();


export const Provider = (props) => {

  const [library, setLibrary] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Context.Provider value={{
      library: library,
      setLibrary: setLibrary,
      isAuthenticated: isAuthenticated,
      setIsAuthenticated: setIsAuthenticated
    }}>
      {props.children}
    </Context.Provider>
  );
}