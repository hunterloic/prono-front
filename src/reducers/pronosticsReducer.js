export default function pronosticsReducer(state = [], action) {
  switch (action.type) {
    case "SET_PRONOSTIC": {
      const { gameId, teamId, pronostic } = { ...action.payload };

      const pronostics = [...state];

      const pronosticToUpdate = pronostics.filter(
        (p) => p.gameId === gameId && p.teamId === teamId
      )[0];

      if (!pronosticToUpdate) {
        pronostics.push({
          tempId: getLatestAddedPronostic(pronostics).tempId + 1,
          gameId,
          teamId,
          pronostic,
        });
      } else {
        pronosticToUpdate.updated = true;
        pronosticToUpdate.pronostic = pronostic;
      }

      return pronostics;
    }
    default:
      throw new Error("INVALID PRONOSTIC ACTION");
  }
}

const getLatestAddedPronostic = (pronostics) => {
  return pronostics.reduce(
    (prev, curr) => (curr.tempId && curr.tempId > prev.tempId ? curr : prev),
    { tempId: 0 }
  );
};
