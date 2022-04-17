export default function pronosticsReducer(state = [], action) {
  switch (action.type) {
    case "INIT_PRONOSTICS": {
      const { pronostics } = { ...action.payload };
      return pronostics;
    }
    case "DELETE_PRONOSTIC": {
      const { gameId, teamId } = { ...action.payload };

      const pronostics = [...state];

      const pronosticToDelete = pronostics.filter(
        (p) => p.gameId === gameId && p.teamId === teamId
      )[0];

      if (pronosticToDelete) {
        pronosticToDelete.pronostic = null;
        pronosticToDelete.deleted = true;
      }

      return pronostics;
    }
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
          updated: true,
        });
      } else {
        if (pronosticToUpdate.deleted) {
          pronosticToUpdate.deleted = false;
        }
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
