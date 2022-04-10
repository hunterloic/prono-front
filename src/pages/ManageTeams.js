import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import CountryFlag from "../components/CountryFlag";
import { useAxios } from "../hooks/useAxios";

export default function ManageTeams() {
  const [teams, setTeams] = useState([]);
  const { axios } = useAxios();

  useEffect(() => {
    async function fetchTeams() {
      setTeams([
        ...(await axios.get("/teams")).data,
        { tempId: getLatestAddedTeam().tempId + 1 },
      ]);
    }

    fetchTeams();
  }, []);

  const teamDeletedOrUpdateFilter = (team) => team.updated || team.deleted;

  const handleUpdateTeams = async () => {
    setTeams([
      ...(
        await axios.put(
          "/teams",
          teams.filter((team) => teamDeletedOrUpdateFilter(team))
        )
      ).data,
      { tempId: getLatestAddedTeam().tempId + 1 },
    ]);
  };

  const filterTeamsById = (teams, team) => {
    return teams.filter((t) => {
      if (team.id) return t.id === team.id;
      if (team.tempId) return t.tempId === team.tempId;
      return false;
    })[0];
  };

  const handleChangeTeamName = (team, name) => {
    const newTeams = [...teams];
    const teamToUpdate = filterTeamsById(newTeams, team);
    teamToUpdate.name = name;
    teamToUpdate.updated = true;
    setTeams(newTeams);
  };

  const handleChangeTeamCode = (team, code) => {
    const newTeams = [...teams];
    const teamToUpdate = filterTeamsById(newTeams, team);
    teamToUpdate.updated = true;
    teamToUpdate.code = code;
    setTeams(newTeams);
  };

  const getLatestAddedTeam = () => {
    return teams.reduce(
      (prev, curr) => (curr.tempId && curr.tempId > prev.tempId ? curr : prev),
      { tempId: 0 }
    );
  };

  const handleAddTeam = () => {
    setTeams([...teams, { tempId: getLatestAddedTeam().tempId + 1 }]);
  };

  const handleRemoveTeam = (team) => {
    const newTeams = [...teams];
    const teamToRemove = filterTeamsById(newTeams, team);
    teamToRemove.deleted = true;
    teamToRemove.name = "";
    teamToRemove.code = "";
    setTeams(newTeams);
  };

  return (
    <Container>
      <Stack direction="vertical" gap={2} className="my-2">
        <Button
          variant="success"
          onClick={handleUpdateTeams}
          disabled={
            teams.filter((team) => teamDeletedOrUpdateFilter(team)).length === 0
          }
        >
          Submit
        </Button>
        {teams &&
          teams
            .filter((team) => !team.deleted)
            .map((team, index) => (
              <Stack key={index} direction="horizontal" gap={2}>
                <Form.Control
                  style={{ fontSize: "0.8em" }}
                  value={team.id || ""}
                  disabled
                />
                <Form.Control
                  value={team.code || ""}
                  onChange={(e) => handleChangeTeamCode(team, e.target.value)}
                />
                <Form.Control
                  value={team.name || ""}
                  onChange={(e) => handleChangeTeamName(team, e.target.value)}
                />
                <CountryFlag code={team.code} />
                <Button
                  className="my-2"
                  variant="danger"
                  onClick={(e) => {
                    handleRemoveTeam(team);
                  }}
                >
                  X
                </Button>
              </Stack>
            ))}
        <Button variant="success" onClick={handleAddTeam}>
          Add
        </Button>
      </Stack>
    </Container>
  );
}
