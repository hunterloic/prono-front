import React, { Fragment, useEffect } from "react";
import { Form, Stack } from "react-bootstrap";
import { useGames } from "../hooks/useGames";
import CountryFlag from "./CountryFlag";
import CountryName from "./CountryName";

export default function TeamPronostic({
  gameId,
  teamId,
  code,
  name,
  pronostic,
  order,
}) {
  const { dispatchGames } = useGames();

  const handlePronosticChange = (e) => {
    dispatchGames({
      type: "SET_PRONOSTIC",
      payload: {
        gameId: gameId,
        teamId: teamId,
        pronostic: e.target.value,
      },
    });
  };

  const flagOrder = order === 0 ? 1 : 3;
  const nameOrder = 2;
  const guessOrder = order === 0 ? 3 : 1;

  return (
    <Stack direction="horizontal">
      <CountryFlag code={code} className={`m-1 order-${flagOrder}`} />
      <CountryName className={`m-1 order-${nameOrder}`} name={name} />
      <Form.Control
        className={`p-1 m-1 order-${guessOrder}`}
        style={{ width: "2em" }}
        value={pronostic || ""}
        onChange={handlePronosticChange}
      />
    </Stack>
  );
}
