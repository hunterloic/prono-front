import { result } from "lodash";
import { dateToEpoch } from "../utils/date";

export const futurePredicate = (game) =>
  game.startTime > dateToEpoch(new Date());

export const pastPredicate = (game) =>
  game.startTime <= dateToEpoch(new Date());

export const groupByCategory = (map, game) => {
  if (!map[game.category.categoryId]) {
    map[game.category.categoryId] = [];
  }
  map[game.category.categoryId].push(game);
  return map;
};

export const startTimeComparator = (a, b) => a.startTime - b.startTime;

export const hasResult = (teams) => {
  return (
    teams.filter((team) => team.goal === 0 || team.goal).length === teams.length
  );
};

export const isDrawResult = (teams) => {
  let result = true;
  let goal = teams[0].goal;
  teams.forEach((team) => {
    if (team.goal !== goal) {
      result = false;
    }
  });
  return result;
};

export const getWinnerResult = (teams) => {
  let winnerResult = {
    teamId: teams[0].teamId,
    goal: teams[0].goal,
  };
  teams.forEach((team) => {
    if (team.goal > winnerResult.goal) {
      winnerResult = {
        teamId: team.teamId,
        goal: team.goal,
      };
    }
  });
  return winnerResult;
};

export const hasPronostic = (teams) => {
  return (
    teams.filter((team) => team.pronostic === 0 || team.pronostic).length ===
    teams.length
  );
};

export const isDrawPronostic = (teams) => {
  let result = true;
  let pronostic = teams[0].pronostic;
  teams.forEach((team) => {
    if (team.pronostic !== pronostic) {
      result = false;
    }
  });
  return result;
};

export const getWinnerPronostic = (teams) => {
  let winnerPronostic = {
    teamId: teams[0].teamId,
    pronostic: teams[0].pronostic,
  };
  teams.forEach((team) => {
    if (team.pronostic > winnerPronostic.pronostic) {
      winnerPronostic = {
        teamId: team.teamId,
        pronostic: team.pronostic,
      };
    }
  });
  return winnerPronostic;
};

export const isPronosticMatchingResult = (teams) => {
  let result = true;

  teams.forEach((team) => {
    result = result && team.goal === team.pronostic;
  });

  return result;
};
