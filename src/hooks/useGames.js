import React, { createContext, useReducer, useContext } from 'react';
import gamesReducer from '../reducers/gamesReducer';

const GameContext = createContext();

const useGames = () => useContext(GameContext);

const GamesProvider = ({ games = [], children }) => {
  const [currentGames, dispatchGames] = useReducer(gamesReducer, games);
  return (
    <GameContext.Provider value={{ currentGames, dispatchGames }}>
      {children}
    </GameContext.Provider>
  );
};

const withGamesProvider =
  (Component) =>
  ({ games, ...props }) => {
    return (
      <GamesProvider games={games}>
        <Component {...props} />
      </GamesProvider>
    );
  };

export { GamesProvider, withGamesProvider, useGames };
