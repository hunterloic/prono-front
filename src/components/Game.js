import React from 'react';
import Team from './Team';

export default function Game({ gameId, teams, category, startTime }) {
  return (
    <>
      {teams.map((team, index) => {
        return (
          <Team key={team.teamId} order={index} gameId={gameId} {...team} />
        );
      })}
    </>
  );
}
