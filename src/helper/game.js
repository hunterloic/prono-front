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

export const getWinnerResult = (teams) => {
  const winnerResult = teams.reduce((result, team, index) => {
    if (!result.goal || result.goal < team.goal) {
      result.index = index;
      result.goal = team.goal;
    } else if (result.goal == team.goal) {
      delete result.index;
    }

    return result;
  }, {});

  if (!winnerResult.index) {
    return null;
  }

  return teams[winnerResult.index];
};

export const hasPronostic = (teams) => {
  return (
    teams.filter((team) => team.pronostic === 0 || team.pronostic).length ===
    teams.length
  );
};

export const getWinnerPronostic = (teams) => {
  const winnerPronostic = teams.reduce((result, team, index) => {
    if (!result.pronostic || result.pronostic < team.pronostic) {
      result.index = index;
      result.pronostic = team.pronostic;
    } else if (result.pronostic == team.pronostic) {
      delete result.index;
    }

    return result;
  }, {});

  if (!winnerPronostic.index) {
    return null;
  }

  return teams[winnerPronostic.index].teamId;
};
