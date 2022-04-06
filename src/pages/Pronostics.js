import React, { useEffect, useState } from "react";
import { useGames } from "../hooks/useGames";
import Game from "../components/Game";
import {
  Alert,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  countrySearchPredicate,
  futurePredicate,
  groupByCategory,
  startTimeComparator,
} from "../helper/game";
import Category from "../components/Category";
import { orderComparator } from "../helper/category";
import { usePronostics } from "../hooks/usePronostics";

export default function Pronostics() {
  const { currentPronostics } = usePronostics();
  const { currentGames } = useGames();
  const [searchCountry, setSearchCountry] = useState("");

  const handlePronosticClick = (e) => {
    e.preventDefault();
    alert("click!");
  };

  const categories = currentGames
    .filter(futurePredicate)
    .filter((game) => countrySearchPredicate(game, searchCountry))
    .reduce(groupByCategory, []);

  const handleSearch = (e) => {
    setSearchCountry(e.target.value);
  };

  return (
    <Container>
      <Stack direction="vertical">
        <Stack direction="horizontal">
          <Button
            className="my-2"
            variant="success"
            onClick={handlePronosticClick}
            disabled={currentPronostics.length === 0}
          >
            Submit
          </Button>
          {currentPronostics.length > 0 && (
            <Alert variant="danger" className="m-2 p-2">
              You have unsubmitted pronostics.
            </Alert>
          )}
        </Stack>

        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
            value={searchCountry}
          />
        </Form>
      </Stack>
      <Row>
        {categories.sort(orderComparator).map((category, index) => (
          <Col md="6" xs="12" key={index}>
            <Category category={category} style={{ minWidth: "330px" }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
