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

  // if (!map[game.category.id]) {
  //   map[game.category.id] = [];
  // }
  // map[game.category.id].push(game);
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
    teamId: teams[0].id,
    pronostic: teams[0].pronostic,
  };
  teams.forEach((team) => {
    if (team.pronostic > winnerPronostic.pronostic) {
      winnerPronostic = {
        teamId: team.id,
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
