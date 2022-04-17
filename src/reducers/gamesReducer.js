export default function gameReducer(state = [], action) {
  switch (action.type) {
    case "INIT_GAMES": {
      const { games } = { ...action.payload };
      return games;
    }
    default:
      throw new Error("INVALID GAMES ACTION");
  }
}
