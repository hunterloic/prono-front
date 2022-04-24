import { dateToEpoch } from "../utils/date";

export const futurePredicate = (game) =>
  game.startTime > dateToEpoch(new Date());

export const countrySearchPredicate = (game, search) => {
  if (search === "") {
    return true;
  }
  return (
    game.teams.filter(
      (team) =>
        team.name.toLowerCase().includes(search.toLowerCase()) ||
        team.code.toLowerCase().includes(search.toLowerCase())
    ).length > 0
  );
};

export const pastPredicate = (game) =>
  game.startTime <= dateToEpoch(new Date());

export const groupByCategory = (map, game) => {
  const filterCategory = (item) => item.category.id === game.category.id;
  let category = map.filter(filterCategory)[0];
  if (!category) {
    map.push({ category: game.category });
    category = map.filter(filterCategory)[0];
    category.games = [];
  }
  category.games.push(game);
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
    teamId: teams[0].id,
    goal: teams[0].goal,
  };
  teams.forEach((team) => {
    if (team.goal > winnerResult.goal) {
      winnerResult = {
        teamId: team.id,
        goal: team.goal,
      };
    }
  });
  return winnerResult;
};

export const isDrawPronostic = (pronostics) => {
  let result = true;
  let pronostic = pronostics[0].pronostic;
  pronostics.forEach((p) => {
    if (p.pronostic !== pronostic) {
      result = false;
    }
  });
  return result;
};

export const getWinnerPronostic = (pronostics) => {
  let winnerPronostic = {
    teamId: pronostics[0].teamId,
    pronostic: pronostics[0].pronostic,
  };
  pronostics.forEach((pronostic) => {
    if (pronostic.pronostic > winnerPronostic.pronostic) {
      winnerPronostic = {
        teamId: pronostic.teamId,
        pronostic: pronostic.pronostic,
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
