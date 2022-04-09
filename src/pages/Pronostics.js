import { useGames } from "../hooks/useGames";
import { Alert, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  countrySearchPredicate,
  futurePredicate,
  groupByCategory,
} from "../helper/game";
import Category from "../components/Category";
import { orderComparator } from "../helper/category";
import {
  SearchCountryInput,
  useSearchCountry,
} from "../hooks/useSearchCountry";

export default function Pronostics() {
  const { currentGames } = useGames();
  const { searchCountry } = useSearchCountry();

  const handlePronosticClick = (e) => {
    e.preventDefault();
    alert("click!");
  };

  const categories = currentGames
    .filter(futurePredicate)
    .filter((game) => countrySearchPredicate(game, searchCountry))
    .reduce(groupByCategory, []);

  const filterUpdatedGames = () => {
    return currentGames.filter((g) => g.updated);
  };

  return (
    <Container>
      <Stack direction="vertical">
        <Stack direction="horizontal">
          <Button
            className="my-2"
            variant="success"
            onClick={handlePronosticClick}
            disabled={filterUpdatedGames().length === 0}
          >
            Submit
          </Button>
          {filterUpdatedGames().length > 0 && (
            <Alert variant="danger" className="m-2 p-2">
              You have unsubmitted pronostics.
            </Alert>
          )}
        </Stack>

        <Form className="d-flex">
          <SearchCountryInput />
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
