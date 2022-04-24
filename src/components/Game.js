import {
  Badge,
  Stack,
  Alert,
  Tooltip,
  OverlayTrigger,
  Row,
} from "react-bootstrap";
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
import { usePronostics } from "../hooks/usePronostic";

export default function Game({ id: gameId, teams, startTime }) {
  const { currentPronostics } = usePronostics();

  const gamePronostics = currentPronostics.filter((p) => p.gameId == gameId);

  const getPronostic = (gameId, teamId) => {
    return (
      gamePronostics.filter(
        (prono) =>
          prono.gameId === gameId && prono.teamId === teamId && !prono.deleted
      )[0]?.pronostic || ""
    );
  };

  const hasResultConst = hasResult(teams);
  const hasPronosticConst = gamePronostics.length === teams.length;

  const isDrawResultConst = hasResultConst && isDrawResult(teams);
  const isDrawPronosticConst =
    hasPronosticConst && isDrawPronostic(gamePronostics);

  const winnerTeamIdResult =
    hasResultConst && !isDrawResultConst ? getWinnerResult(teams).teamId : null;

  const winnerTeamIdPronostic =
    hasPronosticConst && !isDrawPronosticConst
      ? getWinnerPronostic(gamePronostics).teamId
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
          const {
            id: teamId,
            code: teamCode,
            name: teamName,
            goal: teamGoal,
          } = team;
          const pronostic = getPronostic(gameId, teamId);
          return startTime > dateToEpoch(new Date()) ? (
            <TeamPronostic
              key={index}
              gameId={gameId}
              teamId={teamId}
              code={teamCode}
              name={teamName}
              order={index}
            />
          ) : (
            <TeamResult
              key={index}
              order={index}
              gameId={gameId}
              code={teamCode}
              name={teamName}
              goal={teamGoal}
              goalPronosticOk={team.goal === pronostic}
              pronostic={pronostic}
              winner={winnerTeamIdResult === team.id}
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
