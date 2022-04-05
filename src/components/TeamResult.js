import React from "react";
import { Stack } from "react-bootstrap";
import { useGames } from "../hooks/useGames";
import CountryFlag from "./CountryFlag";
import CountryName from "./CountryName";
import styled from "styled-components";

const Pronostic = styled.sup`
  color: ${({ goalPronosticOk }) => (goalPronosticOk ? "green" : "darkRed")};
  font-weight: 600;
`;

export default function TeamResult({
  code,
  name,
  goal = "?",
  pronostic,
  order,
  winner,
  goalPronosticOk,
}) {
  const flagOrder = order === 0 ? 1 : 3;
  const nameOrder = 2;
  const guessOrder = order === 0 ? 3 : 1;

  return (
    <Stack direction="horizontal">
      <CountryFlag code={code} className={`m-1 order-${flagOrder}`} />
      <CountryName
        style={{ color: winner ? "green" : "black" }}
        className={`m-1 order-${nameOrder}`}
        name={name}
      />
      <div
        className={`p-1 m-1 order-${guessOrder}`}
        style={{ fontSize: "1.25em" }}
      >
        {goal}
        <Pronostic goalPronosticOk={goalPronosticOk}>{pronostic}</Pronostic>
      </div>
    </Stack>
  );
}
