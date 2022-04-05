/*
state sample :
[{
  gameId:1,
  teamId:1,
  pronostic:1
}]

*/

export default function gameReducer(state = [], action) {
  switch (action.type) {
    case "CLEAR": {
      return [];
    }
    case "SET_PRONOSTIC": {
      const { gameId, teamId, pronostic } = { ...action.payload };
      const pronostics = [...state];

      const pronosticToUpdate = pronostics.filter(
        (p) => p.gameId === gameId && p.teamId === teamId
      )[0];

      if (pronosticToUpdate) {
        pronosticToUpdate.pronostic = pronostic;
      } else {
        pronostics.push({
          gameId,
          teamId,
          pronostic,
        });
      }

      return pronostics;
    }
    default:
      throw new Error("INVALID PRONOSTIC ACTION");
  }
}
