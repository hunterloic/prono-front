import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";

export default function Pronostics() {
  const { currentGames } = useGames();

  const handlePronosticClick = () => {};

  return (
    <>
      <h2>Games</h2>
      {currentGames.map((game) => {
        return (
          <p key={game.gameId}>
            <Game {...game} />
          </p>
        );
      })}
      <button onClick={handlePronosticClick}>Submit all</button>
    </>
  );
}
