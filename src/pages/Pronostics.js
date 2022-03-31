import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import { Container } from "react-bootstrap";

export default function Pronostics() {
  const { currentGames } = useGames();

  const handlePronosticClick = () => {};

  return (
    <Container>
      <h2>Games</h2>
      {currentGames.map((game) => {
        return (
          <p key={game.gameId}>
            <Game {...game} />
          </p>
        );
      })}
      <button onClick={handlePronosticClick}>Submit all</button>
    </Container>
  );
}
