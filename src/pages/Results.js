import React from "react";
import { useGames } from "../hooks/useGames";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
  countrySearchPredicate,
  groupByCategory,
  pastPredicate,
} from "../helper/game";
import Category from "../components/Category";
import { orderComparator } from "../helper/category";
import {
  SearchCountryInput,
  useSearchCountry,
} from "../hooks/useSearchCountry";

export default function Results() {
  const { currentGames } = useGames();
  const { searchCountry } = useSearchCountry();

  const categories = currentGames
    .filter(pastPredicate)
    .filter((game) => countrySearchPredicate(game, searchCountry))
    .reduce(groupByCategory, []);

  return (
    <Container>
      <Form className="d-flex">
        <SearchCountryInput className="me-2 mt-2" aria-label="Search" />
      </Form>
      <Row>
        {categories.sort(orderComparator).map((category, index) => (
          <Col md="6" xs="12" key={index}>
            <Category category={category} style={{ minWidth: "350px" }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
