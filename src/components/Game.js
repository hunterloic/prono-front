import React from "react";
import { Form, Stack, Button } from "react-bootstrap";
import Team from "./Team";
import { epochToDate } from "../utils/date";
import CountryFlag from "../components/CountryFlag";

export default function Game({ gameId, teams, category, startTime }) {
  return (
    <Stack direction="vertical">
      <div>{epochToDate("ddd, mmm dS, yyyy, h:MM TT", startTime)}</div>
      <Stack direction="horizontal">
        <Stack direction="horizontal">
          <CountryFlag code={teams[0].code} className="m-1" />
          <span
            className="m-1"
            style={{
              width: "4.5em",
              wordBreak: "break-all",
            }}
          >
            {teams[0].name}
          </span>
          <Form.Control className="p-1 m-1" style={{ width: "2em" }} />
        </Stack>
        <Stack direction="horizontal">
          <CountryFlag code={teams[1].code} className="m-1 order-3" />
          <span
            className="m-1 order-2"
            style={{
              width: "4.5em",
              wordBreak: "break-all",
            }}
          >
            {teams[1].name}
          </span>
          <Form.Control className="p-1 m-1 order-1" style={{ width: "2em" }} />
        </Stack>
      </Stack>
    </Stack>
  );
}
