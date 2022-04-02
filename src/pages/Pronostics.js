import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import { Card, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Pronostics() {
  const { currentGames } = useGames();

  const handlePronosticClick = () => {
    alert("click!");
  };

  return (
    <Container>
      <Button className="my-2" variant="success" onClick={handlePronosticClick}>
        Submit
      </Button>
      <Card className="my-2 bg-light">
        <Card.Body>
          <Card.Title>Group 1</Card.Title>
          <Card.Text>
            {currentGames.map((game) => {
              return (
                <Row key={game.gameId}>
                  <Game {...game} />
                </Row>
              );
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
