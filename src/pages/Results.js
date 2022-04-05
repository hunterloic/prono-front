import React from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { dateToEpoch } from "../utils/date";
import {
  futurePredicate,
  groupByCategory,
  pastPredicate,
  startTimeComparator,
} from "../helper/game";
import Category from "../components/Category";
import { orderComparator } from "../helper/category";

export default function Results() {
  const { currentGames } = useGames();

  const handlePronosticClick = () => {
    alert("click!");
  };

  const categories = currentGames
    .filter(pastPredicate)
    .reduce(groupByCategory, []);

  return (
    <Container>
      <Row>
        {categories.sort(orderComparator).map((category, index) => (
          <Col lg="6" xs="12" key={index}>
            <Category category={category} style={{ minWidth: "365px" }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
