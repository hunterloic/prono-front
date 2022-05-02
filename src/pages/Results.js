import React, { useEffect, useState } from "react";
import { useGames } from "../hooks/useGames";
import { Alert, Col, Container, Form, Row, Stack } from "react-bootstrap";
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
import { useAxios } from "../hooks/useAxios";

export default function Results() {
  const { axios } = useAxios();
  const [points, setPoints] = useState(0);
  const { currentGames } = useGames();
  const { searchCountry } = useSearchCountry();

  useEffect(() => {
    async function fetchPoints() {
      setPoints((await axios.get("/ladder/user")).data);
    }

    fetchPoints();
  }, []);

  const categories = currentGames
    .filter(pastPredicate)
    .filter((game) => countrySearchPredicate(game, searchCountry))
    .reduce(groupByCategory, []);

  return (
    <Container>
      <Stack direction="vertical" gap={2}>
        <div>
          <Alert variant="info" className="mx-1 my-2 p-2">
            <b>Total points : {points}</b>
          </Alert>
        </div>
        <div>
          <Form className="d-flex">
            <SearchCountryInput className="me-2 mt-2" aria-label="Search" />
          </Form>
        </div>
        <div>
          <Row>
            {categories
              .sort(orderComparator)
              .map(({ category, games }, index) => (
                <Col md="6" xs="12" key={index}>
                  <Category
                    category={category}
                    games={games}
                    style={{ minWidth: "350px" }}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </Stack>
    </Container>
  );
}
