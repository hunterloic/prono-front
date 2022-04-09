export const isWinner = (teams, team) => {
  return (
    teams.filter((t) => t.id != team.id && t.goal >= team.goal).length == 0
  );
};
