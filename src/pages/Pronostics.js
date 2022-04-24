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
import { usePronostics } from "../hooks/usePronostic";
import { useAxios } from "../hooks/useAxios";

export default function Pronostics() {
  const { axios } = useAxios();
  const { currentGames } = useGames();
  const { searchCountry } = useSearchCountry();
  const { currentPronostics, dispatchPronostics } = usePronostics();

  const handlePronosticClick = async () => {
    dispatchPronostics({
      type: "INIT_PRONOSTICS",
      payload: {
        pronostics: [
          ...(
            await axios.put(
              "/pronostic",
              currentPronostics.filter((prono) =>
                pronosticDeletedOrUpdateFilter(prono)
              )
            )
          ).data,
        ],
      },
    });
  };

  const pronosticDeletedOrUpdateFilter = (prono) =>
    prono.updated || prono.deleted;

  const categories = currentGames
    .filter(futurePredicate)
    .filter((game) => countrySearchPredicate(game, searchCountry))
    .reduce(groupByCategory, []);

  const filterUpdatedPronostics = () => {
    return currentPronostics.filter((p) => p.updated);
  };

  return (
    <Container gap={2}>
      <Stack direction="vertical">
        <Stack direction="horizontal" gap={2}>
          <Button
            className="my-2"
            variant="success"
            onClick={handlePronosticClick}
            disabled={filterUpdatedPronostics().length === 0}
          >
            Submit
          </Button>
          {filterUpdatedPronostics().length > 0 && (
            <Alert variant="danger" className="my-2 py-1 px-2">
              You have unsubmitted pronostics.
            </Alert>
          )}
        </Stack>

        <Form className="d-flex">
          <SearchCountryInput />
        </Form>
      </Stack>
      <Row>
        {categories.sort(orderComparator).map(({ category, games }, index) => (
          <Col md="6" xs="12" key={index}>
            <Category
              category={category}
              games={games}
              style={{ minWidth: "330px" }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
