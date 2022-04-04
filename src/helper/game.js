import { dateToEpoch } from "../utils/date";

export const futurePredicate = (game) =>
  game.startTime > dateToEpoch(new Date());

export const groupByCategory = (map, game) => {
  if (!map[game.category.categoryId]) {
    map[game.category.categoryId] = [];
  }
  map[game.category.categoryId].push(game);
  return map;
};

export const startTimeComparator = (a, b) => a.startTime - b.startTime;
