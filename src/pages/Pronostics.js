import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Pronostics() {
  const { currentGames } = useGames();

  const handlePronosticClick = () => {
    alert("click!");
  };

  const categories = currentGames.reduce((map, game) => {
    if (!map[game.category.categoryId]) {
      map[game.category.categoryId] = [];
    }
    map[game.category.categoryId].push(game);
    return map;
  }, []);

  return (
    <Container>
      <Button className="my-2" variant="success" onClick={handlePronosticClick}>
        Submit
      </Button>
      <Row>
        {categories.map((category, index) => (
          <Col md="6" xs="12" key={index}>
            <Card className="my-2">
              <Card.Header className="p-2">
                {category[0].category.name}
              </Card.Header>
              <ListGroup>
                {category.map((game, index) => (
                  <ListGroup.Item key={index} className="p-1">
                    <Game {...game} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
