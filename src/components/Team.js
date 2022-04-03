import React, { Fragment, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { useGames } from "../hooks/useGames";
import CountryFlag from "./CountryFlag";

export default function Team({
  gameId,
  teamId,
  code,
  name,
  result,
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
    // <StyledRow className="align-items-center my-2">
    //   <StyledCol
    //     className="align-items-center"
    //     sm={{ order: flagOrder, span: 4 }}
    //   >
    //     <CountryFlag code={code} xs={{ order: flagOrder }} />
    //   </StyledCol>
    //   <StyledCol sm={{ order: nameOrder, span: 4 }}>{name}</StyledCol>
    //   <StyledCol sm={{ order: guessOrder, span: 4 }}>
    //     <Form.Control
    //       placeholder=""
    //       value={pronostic || ""}
    //       onChange={handlePronosticChange}
    //     />
    //   </StyledCol>
    // </StyledRow>

    <>
      <p>
        <CountryFlag code={code} xs={{ order: flagOrder }} />
      </p>
      <p>{name}</p>
      <p>
        <Form.Control
          placeholder=""
          value={pronostic || ""}
          onChange={handlePronosticChange}
        />
      </p>
    </>
  );
}

const StyledRow = styled(Row)``;

const StyledCol = styled(Col)`
  border: solid black 1px;
  height: 50px;
`;
