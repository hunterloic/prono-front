import React, { useRef, useState } from "react";
import {
  Badge,
  Form,
  Stack,
  Alert,
  Overlay,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
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
  isDrawPronostic,
  isDrawResult,
  isPronosticMatchingResult,
} from "../helper/game";
import { pointConfig } from "../config/points";

export default function Game({ gameId, teams, startTime }) {
  const hasResultConst = hasResult(teams);
  const hasPronosticConst = hasPronostic(teams);

  const isDrawResultConst = hasResultConst && isDrawResult(teams);
  const isDrawPronosticConst = hasPronosticConst && isDrawPronostic(teams);

  const winnerTeamIdResult =
    hasResultConst && !isDrawResultConst ? getWinnerResult(teams).id : null;

  const winnerTeamIdPronostic =
    hasPronosticConst && !isDrawPronosticConst
      ? getWinnerPronostic(teams).id
      : null;

  const pronosticMatchWinner = winnerTeamIdResult === winnerTeamIdPronostic;
  const pronosticMatchScore = isPronosticMatchingResult(teams);

  return (
    <Stack direction="vertical">
      <Badge bg="light" text="dark">
        {epochToDate("ddd, mmm dS, yyyy, h:MM TT", startTime)}
      </Badge>
      <Stack direction="horizontal">
        {teams.map((team, index) => {
          const { id: teamId, ...rest } = team;
          return startTime > dateToEpoch(new Date()) ? (
            <TeamPronostic
              gameId={gameId}
              order={index}
              key={index}
              teamId={teamId}
              {...rest}
            />
          ) : (
            <TeamResult
              gameId={gameId}
              order={index}
              key={index}
              teamId={teamId}
              goalPronosticOk={team.goal === team.pronostic}
              winner={winnerTeamIdResult === team.id}
              {...rest}
            />
          );
        })}
        {hasResultConst && hasPronosticConst && pronosticMatchWinner && (
          <>
            <p
              className="my-1 mx-2"
              style={{ fontSize: "1.3em", fontWeight: "bold" }}
            >
              {"|"}
            </p>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip>
                  {!pronosticMatchScore && (
                    <>
                      {pointConfig.winnerMatchPoint} point for guessing
                      correctly the winner
                    </>
                  )}
                  {pronosticMatchScore && (
                    <>
                      {pointConfig.scoreMatchPoint} points for guessing
                      correctly the score
                    </>
                  )}
                </Tooltip>
              }
            >
              <Alert variant="success" className="my-1 mx-2 p-1">
                {pronosticMatchScore ? (
                  <>{pointConfig.scoreMatchPoint}</>
                ) : (
                  <>{pointConfig.winnerMatchPoint}</>
                )}{" "}
                pt<sup> ?</sup>
              </Alert>
            </OverlayTrigger>
          </>
        )}
      </Stack>
    </Stack>
  );
}
