import { Stack } from "react-bootstrap";
import CountryFlag from "./CountryFlag";
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
  goalPronosticOk,
  winner,
  order,
}) {
  const flagOrder = order === 0 ? 1 : 3;
  const nameOrder = 2;
  const guessOrder = order === 0 ? 3 : 1;

  return (
    <Stack direction="horizontal" gap={1}>
      <CountryFlag code={code} className={`order-${flagOrder}`} />
      <div
        style={{
          color: winner ? "green" : "black",
          width: "4.5em",
          wordBreak: "break-all",
        }}
        className={`order-${nameOrder}`}
      >
        {name}
      </div>
      <div
        className={`p-1 order-${guessOrder}`}
        style={{ width: "1.4em", fontSize: "1.2em" }}
      >
        {goal}
        <Pronostic goalPronosticOk={goalPronosticOk}>{pronostic}</Pronostic>
      </div>
    </Stack>
  );
}
