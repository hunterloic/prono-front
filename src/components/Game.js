import React from "react";
import { Form, Stack } from "react-bootstrap";
import Team from "./Team";
import { epochToDate } from "../utils/date";
import CountryFlag from "../components/CountryFlag";
import CountryName from "./CountryName";

export default function Game({ gameId, teams, category, startTime }) {
  return (
    <Stack direction="vertical">
      <div>{epochToDate("ddd, mmm dS, yyyy, h:MM TT", startTime)}</div>
      <Stack direction="horizontal">
        {teams.map((team, index) => (
          <Team order={index} key={index} {...team} />
        ))}
      </Stack>
    </Stack>
  );
}
