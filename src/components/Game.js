import { Badge, Stack, Alert, Tooltip, OverlayTrigger } from "react-bootstrap";
import { dateToEpoch, epochToDateString } from "../utils/date";
import TeamResult from "./TeamResult";
import TeamPronostic from "./TeamPronostic";
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

export default function Game({ id, teams, startTime }) {
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
        {epochToDateString("ddd, mmm dS, yyyy, h:MM TT", startTime)}
      </Badge>
      <Stack direction="horizontal" gap={1}>
        {teams.map((team, index) => {
          const { id: teamId, ...rest } = team;
          return startTime > dateToEpoch(new Date()) ? (
            <TeamPronostic
              key={index}
              order={index}
              gameId={id}
              teamId={teamId}
              {...rest}
            />
          ) : (
            <TeamResult
              key={index}
              order={index}
              gameId={id}
              // TODO team.pronostic do not exists, use usePronostics currentPronostics
              goalPronosticOk={team.goal === team.pronostic}
              winner={winnerTeamIdResult === team.id}
              {...rest}
            />
          );
        })}

        {/* show points only if date is over & there is result & there is pronostic */}
        {startTime < dateToEpoch(new Date()) &&
          hasResultConst &&
          hasPronosticConst &&
          pronosticMatchWinner && (
            <>
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
                <Alert variant="success" className="mx-1 my-2 p-1">
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
