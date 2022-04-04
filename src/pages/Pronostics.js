import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { dateToEpoch } from "../utils/date";
import {
  futurePredicate,
  groupByCategory,
  startTimeComparator,
} from "../helper/game";

export default function Pronostics() {
  const { currentGames } = useGames();

  const handlePronosticClick = () => {
    alert("click!");
  };

  const categories = currentGames
    .filter(futurePredicate)
    .reduce(groupByCategory, []);

  return (
    <Container>
      <Button className="my-2" variant="success" onClick={handlePronosticClick}>
        Submit
      </Button>
      <Row>
        {categories
          .sort((a, b) => a[0].category.order - b[0].category.order)
          .map((category, index) => (
            <Col md="6" xs="12" key={index}>
              <Card className="my-2">
                <Card.Header className="p-2">
                  {category[0].category.name}
                </Card.Header>
                <ListGroup>
                  {category.sort(startTimeComparator).map((game, index) => (
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
