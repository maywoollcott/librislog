import { useState, createContext } from 'react';
export const Context = createContext();


export const Provider = (props) => {

  const [library, setLibrary] = useState([]);

  const [sessions, setSessions] = useState([]);

  const [streak, setStreak] = useState(0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Context.Provider value={{
      library: library,
      setLibrary: setLibrary,
      sessions: sessions,
      setSessions: setSessions,
      streak: streak,
      setStreak: setStreak,
      isAuthenticated: isAuthenticated,
      setIsAuthenticated: setIsAuthenticated
    }}>
      {props.children}
    </Context.Provider>
  );
}