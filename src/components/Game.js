import React from "react";
import { Badge, Form, Stack } from "react-bootstrap";
import { dateToEpoch, epochToDate } from "../utils/date";
import CountryFlag from "../components/CountryFlag";
import CountryName from "./CountryName";
import TeamResult from "./TeamResult";
import TeamPronostic from "./TeamPronostic";
import { isWinner } from "../helper/team";
import {
  getWinnerPronostic,
  getWinnerResult,
  hasPronostic,
  hasResult,
} from "../helper/game";

export default function Game({ gameId, teams, startTime }) {
  let points = 0;

  const hasResultConst = hasResult(teams);
  const hasPronosticConst = hasPronostic(teams);

  const winnerTeamId = hasResultConst ? getWinnerResult(teams)?.teamId : null;
  const winnerPronosticId = hasPronosticConst
    ? getWinnerPronostic(teams)?.teamId
    : null;

  return (
    <Stack direction="vertical">
      <Badge bg="light" text="dark">
        {epochToDate("ddd, mmm dS, yyyy, h:MM TT", startTime)}
      </Badge>
      <Stack direction="horizontal">
        {teams.map((team, index) =>
          startTime > dateToEpoch(new Date()) ? (
            <TeamPronostic
              gameId={gameId}
              order={index}
              key={index}
              {...team}
            />
          ) : (
            <TeamResult
              gameId={gameId}
              order={index}
              key={index}
              {...team}
              goalPronosticOk={team.goal === team.pronostic}
              winner={winnerTeamId === team.teamId}
            />
          )
        )}
        {winnerTeamId &&
          winnerPronosticId &&
          winnerTeamId === winnerPronosticId && <div>hello</div>}
      </Stack>
    </Stack>
  );
}
