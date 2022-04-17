import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useAxios } from "../hooks/useAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateToEpoch } from "../utils/date";
import Select from "react-select";

export default function ManageGames() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const { axios } = useAxios();

  useEffect(() => {
    async function fetchGames() {
      setGames([...(await axios.get("/game")).data, createGame()]);
    }

    async function fetchCategories() {
      setCategories((await axios.get("/category")).data);
    }

    async function fetchTeams() {
      setTeams((await axios.get("/team")).data);
    }

    fetchGames();
    fetchCategories();
    fetchTeams();
  }, []);

  const gameDeletedOrUpdateFilter = (game) => game.updated || game.deleted;

  const handleUpdateGames = async () => {
    setGames([
      ...(
        await axios.put(
          "/game",
          games.filter((game) => gameDeletedOrUpdateFilter(game))
        )
      ).data,
      createGame(),
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
    setGames(newGames);
  };

  const handleChangeGameStartTime = (game, date) => {
    const newGames = [...games];
    const gameToUpdate = filterGamesById(newGames, game);
    gameToUpdate.startTime = dateToEpoch(date);
    gameToUpdate.updated = true;
    setGames(newGames);
  };

  const handleChangeGameTeam = (game, teamIndex, teamId) => {
    const team = teams.filter((t) => t.id === teamId)[0];
    if (!team) return;
    const newGames = [...games];
    const gameToUpdate = filterGamesById(newGames, game);
    const teamToUpdate = gameToUpdate.teams[teamIndex];
    teamToUpdate.id = team.id;
    teamToUpdate.code = team.code;
    teamToUpdate.name = team.name;
    gameToUpdate.updated = true;
    setGames(newGames);
  };

  const handleChangeTeamGoal = (game, teamIndex, goal) => {
    if (goal.length > 2) {
      return;
    }
    const team = game.teams[teamIndex];
    if (!team) return;
    const newGames = [...games];
    const gameToUpdate = filterGamesById(newGames, game);
    const teamToUpdate = gameToUpdate.teams[teamIndex];
    teamToUpdate.goal = parseInt(goal);
    gameToUpdate.updated = true;
    setGames(newGames);
  };

  const getTeamGoal = (game, teamIndex) => {
    const goal = game?.teams[teamIndex]?.goal;
    if (goal != 0 && !goal) {
      return "";
    }
    return goal;
  };

  const getLatestAddedGame = () => {
    return games.reduce(
      (prev, curr) => (curr.tempId && curr.tempId > prev.tempId ? curr : prev),
      { tempId: 0 }
    );
  };

  const createGame = () => {
    return {
      tempId: getLatestAddedGame().tempId + 1,
      startTime: dateToEpoch(new Date()),
      teams: [createTeam(), createTeam()],
      category: createcategory(),
    };
  };

  const createTeam = () => {
    return {};
  };

  const createcategory = () => {
    return {};
  };

  const handleAddGame = () => {
    setGames([...games, createGame()]);
  };

  const handleRemoveGame = (game) => {
    const newGames = [...games];
    const gameToRemove = filterGamesById(newGames, game);
    gameToRemove.deleted = true;
    gameToRemove.teams = [createTeam(), createTeam()];
    gameToRemove.category = createcategory();
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

  const categoriesOptions =
    categories &&
    categories.map((category) => {
      return {
        value: category.id,
        label: category.name,
      };
    });

  const getGameCategoryOption = (game) => {
    return categoriesOptions.filter(
      (category) => category.value === game?.category?.id
    )[0];
  };

  const teamsOptions =
    teams &&
    teams.map((team) => {
      return {
        value: team.id,
        label: team.name,
      };
    });

  const getGameTeamsOption = (team) => {
    return teamsOptions.filter((t) => t.value === team?.id)[0];
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
                    style={{ fontSize: "0.7em", width: "7em" }}
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
                <div style={{ width: "10em" }}>
                  <Select
                    value={getGameCategoryOption(game) || ""}
                    onChange={(opt) => {
                      handleChangeGameCategory(game, opt.value);
                    }}
                    options={categoriesOptions}
                  />
                </div>
                <div style={{ width: "10em" }}>
                  <Select
                    value={getGameTeamsOption(game?.teams[0]) || ""}
                    onChange={(opt) => {
                      handleChangeGameTeam(game, 0, opt.value);
                    }}
                    options={teamsOptions}
                  />
                </div>
                <div>
                  <Form.Control
                    maxLength="2"
                    className="p-1"
                    style={{ width: "3em" }}
                    type="number"
                    min="0"
                    value={getTeamGoal(game, 0)}
                    onChange={(e) =>
                      handleChangeTeamGoal(game, 0, e.target.value)
                    }
                  />
                </div>
                <div>
                  <Form.Control
                    maxLength="2"
                    className="p-1"
                    style={{ width: "3em" }}
                    type="number"
                    min="0"
                    value={getTeamGoal(game, 1)}
                    onChange={(e) =>
                      handleChangeTeamGoal(game, 1, e.target.value)
                    }
                  />
                </div>
                <div style={{ width: "10em" }}>
                  <Select
                    value={getGameTeamsOption(game?.teams[1]) || ""}
                    onChange={(opt) => {
                      handleChangeGameTeam(game, 1, opt.value);
                    }}
                    options={teamsOptions}
                  />
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
