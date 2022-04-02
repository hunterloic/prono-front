import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import { Card, Col, Container, Row } from "react-bootstrap";
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
          <Col lg="3" xs="6" key={index}>
            <Card className="m-2 bg-light">
              <Card.Body>
                <Card.Title>{category[0].category.categoryName}</Card.Title>
                <Card.Text as="div">
                  {category.map((game) => (
                    // <Row key={game.gameId}>
                    //   <Game {...game} />
                    // </Row>
                    <Game {...game} />
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
