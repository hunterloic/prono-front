import React from "react";
import { Col, Row } from "react-bootstrap";
import Team from "./Team";

export default function Game({ gameId, teams, category, startTime }) {
  return (
    <>
      {teams.map((team, index) => {
        return (
          <Col xs={6} key={team.teamId}>
            <Team order={index} gameId={gameId} {...team} />
          </Col>
        );
      })}
    </>
  );
}
