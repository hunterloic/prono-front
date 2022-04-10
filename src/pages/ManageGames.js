import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Stack,
} from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateToEpoch } from "../utils/date";

export default function ManageGames() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const { axios } = useAxios();

  useEffect(() => {
    async function fetchGames() {
      // setTeams([
      //   ...(await axios.get("/games")).data,
      //   { tempId: getLatestAddedTeam().tempId + 1 },
      // ]);
      setGames([
        {
          id: 1,
          startTime: 1667469600,
          category: {
            id: "62524fc85ef09305e935ad6e",
            order: 2,
            name: "Semi-finals",
          },
        },
      ]);
    }

    async function fetchCategories() {
      setCategories((await axios.get("/categories")).data);
    }

    async function fetchTeams() {
      // setTeams([
      //   ...(await axios.get("/games")).data,
      //   { tempId: getLatestAddedTeam().tempId + 1 },
      // ]);
    }

    fetchGames();
    fetchCategories();
  }, []);

  const gameDeletedOrUpdateFilter = (game) => game.updated || game.deleted;

  const handleUpdateGames = async () => {
    setGames([
      ...(
        await axios.put(
          "/games",
          games.filter((game) => gameDeletedOrUpdateFilter(game))
        )
      ).data,
      { tempId: getLatestAddedGame().tempId + 1 },
    ]);
  };

  const filterGamesById = (games, game) => {
    return games.filter((g) => {
      if (game.id) return g.id === game.id;
      if (game.tempId) return g.tempId === game.tempId;
      return false;
    })[0];
  };
  const handleChangeGameCategory = (game, categoryId) => {
    const category = categories.filter((c) => c.id === categoryId)[0];
    if (!category) return;

    const newGames = [...games];
    const gameToUpdate = filterGamesById(newGames, game);
    gameToUpdate.category = category;
    gameToUpdate.updated = true;
    console.log(JSON.stringify(newGames));
    setGames(newGames);
  };

  const handleChangeGameStartTime = (game, date) => {
    const newGames = [...games];
    const gameToUpdate = filterGamesById(newGames, game);
    gameToUpdate.startTime = dateToEpoch(date);
    gameToUpdate.updated = true;
    setGames(newGames);
  };

  const getLatestAddedGame = () => {
    return games.reduce(
      (prev, curr) => (curr.tempId && curr.tempId > prev.tempId ? curr : prev),
      { tempId: 0 }
    );
  };

  const handleAddGame = () => {
    setGames([...games, { tempId: getLatestAddedGame().tempId + 1 }]);
  };

  const handleRemoveGame = (game) => {
    const newGames = [...games];
    const gameToRemove = filterGamesById(newGames, game);
    gameToRemove.deleted = true;
    gameToRemove.startTime = "";
    setGames(newGames);
  };

  const getStartTimeAsDate = (startTime) => {
    if (startTime) {
      const date = new Date(0);
      return date.setUTCSeconds(startTime);
    } else {
      return new Date();
    }
  };

  return (
    <Container>
      <Stack direction="vertical" gap={2} className="my-2">
        <Button
          variant="success"
          onClick={handleUpdateGames}
          disabled={
            games.filter((game) => gameDeletedOrUpdateFilter(game)).length === 0
          }
        >
          Submit
        </Button>
        {games &&
          games
            .filter((game) => !game.deleted)
            .map((game, index) => (
              <Stack
                key={index}
                direction="horizontal"
                className="flex-wrap"
                gap={2}
              >
                <div>
                  <Form.Control
                    style={{ fontSize: "0.7em", width: "10em" }}
                    value={game.id || ""}
                    disabled
                  />
                </div>
                <div>
                  <DatePicker
                    selected={getStartTimeAsDate(game.startTime)}
                    onChange={(date) => handleChangeGameStartTime(game, date)}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
                <div>
                  <Dropdown
                    onSelect={(categoryId) =>
                      handleChangeGameCategory(game, categoryId)
                    }
                  >
                    <Dropdown.Toggle id="dropdown-autoclose-true">
                      {game?.category?.name || "Select a category"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {categories &&
                        categories.map((category, index) => (
                          <Dropdown.Item
                            key={index}
                            eventKey={category.id}
                            active={
                              game.category && category.id === game.category.id
                            }
                          >
                            {category.name}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="ms-auto">
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      handleRemoveGame(game);
                    }}
                  >
                    X
                  </Button>
                </div>
              </Stack>
            ))}
        <Button variant="success" onClick={handleAddGame}>
          Add
        </Button>
      </Stack>
    </Container>
  );
}
