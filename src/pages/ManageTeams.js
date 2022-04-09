import { useEffect, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { loadTeams } from "../api/teams";
import CountryFlag from "../components/CountryFlag";

export default function ManageTeams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // todo : fetch teams
    setTeams(loadTeams);
  }, []);

  const handleUpdateTeams = () => {};

  const filterByTeamId = (teams, team) => {
    return teams.filter((t) => {
      if (team.teamId) return t.teamId === team.teamId;
      if (team.teamTempId) return t.teamTempId === team.teamTempId;
      return false;
    })[0];
  };

  const handleChangeTeamName = (team, name) => {
    const newTeams = [...teams];
    filterByTeamId(newTeams, team).name = name;
    setTeams(newTeams);
  };

  const handleChangeTeamCode = (team, code) => {
    const newTeams = [...teams];
    filterByTeamId(newTeams, team).code = code;
    setTeams(newTeams);
  };

  const getLatestTempIdTeam = () => {
    return teams.reduce(
      (prev, curr) => {
        return curr.teamTempId && curr.teamTempId > prev.teamTempId
          ? curr
          : prev;
      },
      { teamTempId: 0 }
    );
  };

  const handleAddTeam = () => {
    const latestTempIdTeam = getLatestTempIdTeam();
    const teamTempId = latestTempIdTeam.teamTempId + 1;
    const newTeams = [...teams];
    newTeams.push({ teamTempId });
    setTeams(newTeams);
  };

  const handleRemoveTeam = (team) => {
    const newTeams = [...teams];
    filterByTeamId(newTeams, team).deleted = true;
    filterByTeamId(newTeams, team).name = "";
    filterByTeamId(newTeams, team).code = "";
    setTeams(newTeams);
  };

  console.log(teams);

  return (
    <Container>
      <Stack direction="vertical" gap={2}>
        <Button
          className="my-2"
          variant="success"
          onClick={handleUpdateTeams}
          disabled={teams.length === 0}
        >
          Submit
        </Button>
        {teams &&
          teams
            .filter((team) => !team.deleted)
            .map((team, index) => (
              <Stack key={index} direction="horizontal" gap={2}>
                <Form.Control value={team.teamId || ""} disabled />
                <Form.Control
                  value={team.code || ""}
                  onChange={(e) => handleChangeTeamCode(team, e.target.value)}
                />
                <Form.Control
                  value={team.name || ""}
                  onChange={(e) => handleChangeTeamName(team, e.target.value)}
                />
                <CountryFlag
                  style={{ border: "solid black 1px" }}
                  code={team.code}
                />
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
        <Button
          className="my-2"
          variant="success"
          onClick={handleAddTeam}
          disabled={teams.length === 0}
        >
          Add
        </Button>
      </Stack>
    </Container>
  );
}
