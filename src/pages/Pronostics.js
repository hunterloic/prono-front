import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  futurePredicate,
  groupByCategory,
  startTimeComparator,
} from "../helper/game";
import Category from "../components/Category";
import { orderComparator } from "../helper/category";

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
        {categories.sort(orderComparator).map((category, index) => (
          <Col md="6" xs="12" key={index}>
            <Category category={category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
