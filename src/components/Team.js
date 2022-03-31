import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useGames } from '../hooks/useGames';
import CountryFlag from './CountryFlag';

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
      type: 'SET_PRONOSTIC',
      payload: {
        gameId: gameId,
        teamId: teamId,
        pronostic: e.target.value,
      },
    });
  };

  const elements = [
    // todo : use labels
    <span>{name}</span>,
    <CountryFlag code={code} />,
    <input
      type="text"
      value={pronostic || ''}
      onChange={handlePronosticChange}
    />,
    <span value={result} />,
  ];

  return (
    <>
      {(order !== 0 ? elements.reverse() : elements).map((element, index) => {
        return <Fragment key={index}>{element}</Fragment>;
      })}
    </>
  );
}
