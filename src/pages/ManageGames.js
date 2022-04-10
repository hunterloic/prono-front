import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import CountryFlag from "../components/CountryFlag";
import { useAxios } from "../hooks/useAxios";

export default function ManageGames() {
  const [games, setGames] = useState([]);
  const { axios } = useAxios();

  useEffect(() => {
    async function fetchGames() {
      // setTeams([
      //   ...(await axios.get("/games")).data,
      //   { tempId: getLatestAddedTeam().tempId + 1 },
      // ]);
    }

    fetchGames();
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

  const handleChangeGameStartTime = (game, startDateTime) => {
    const newGames = [...games];
    const gameToUpdate = filterGamesById(newGames, game);
    gameToUpdate.startTime = startDateTime;
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
              <Stack key={index} direction="horizontal" gap={2}>
                <Form.Control
                  style={{ fontSize: "0.8em" }}
                  value={game.id || ""}
                  disabled
                />
                <Form.Control
                  value={game.startTime || ""}
                  onChange={(e) =>
                    handleChangeGameStartTime(game, e.target.value)
                  }
                />
                <Button
                  className="my-2"
                  variant="danger"
                  onClick={(e) => {
                    handleRemoveGame(game);
                  }}
                >
                  X
                </Button>
              </Stack>
            ))}
        <Button variant="success" onClick={handleAddGame}>
          Add
        </Button>
      </Stack>
    </Container>
  );
}
