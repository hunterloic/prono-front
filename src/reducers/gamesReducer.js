export default function gameReducer(state = [], action) {
  switch (action.type) {
    case "SET_PRONOSTIC":
      const { gameId, teamId, pronostic } = { ...action.payload };
      const games = [...state];

      const game = games.filter((g) => g.gameId === gameId)[0];
      game.updated = true;

      const teams = game?.teams.filter((team) => team.id === teamId);

      teams.forEach((team) => {
        team.pronostic = pronostic;
      });

      return games;
    default:
      throw new Error("INVALID GAMES ACTION");
  }
}
