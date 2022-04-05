export const isWinner = (teams, team) => {
  return (
    teams.filter((t) => t.teamId != team.teamId && t.goal >= team.goal)
      .length == 0
  );
};
