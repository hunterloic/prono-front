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
import { usePronostics } from "../hooks/usePronostic";

export default function Results({ userName }) {
  const { axios } = useAxios();
  const [points, setPoints] = useState(0);
  const { searchCountry } = useSearchCountry();
  const [currentGames, setCurrentGames] = useState([]);
  const { dispatchPronostics } = usePronostics();

  useEffect(() => {
    async function fetchPoints() {
      const urlParams = userName ? `userName=${userName}` : "";
      setPoints((await axios.get(`/ladder/user?${urlParams}`)).data);
    }

    async function fetchPronostics() {
      const urlParams = userName ? `userName=${userName}` : "";
      dispatchPronostics({
        type: "INIT_PRONOSTICS",
        payload: {
          pronostics: (await axios.get(`/pronostic?${urlParams}`)).data,
        },
      });
    }

    async function fetchGames() {
      setCurrentGames((await axios.get("/game")).data);
    }

    fetchGames();
    fetchPronostics();
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
            {userName && (
              <div>
                <b>User : {userName}</b>
              </div>
            )}
            <div>
              <b>Total points : {points}</b>
            </div>
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
