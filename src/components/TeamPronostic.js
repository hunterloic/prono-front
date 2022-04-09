import { Form, Stack } from "react-bootstrap";
import { useGames } from "../hooks/useGames";
import CountryFlag from "./CountryFlag";

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
    console.log({
      gameId: gameId,
      teamId: teamId,
      pronostic: e.target.value,
    });
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
    <Stack direction="horizontal" gap={1}>
      <CountryFlag code={code} className={`order-${flagOrder}`} />
      <div
        style={{
          width: "4.5em",
          wordBreak: "break-all",
        }}
        className={`order-${nameOrder}`}
      >
        {name}
      </div>
      <Form.Control
        className={`p-1 order-${guessOrder}`}
        style={{ width: "2em" }}
        value={pronostic || ""}
        onChange={handlePronosticChange}
      />
    </Stack>
  );
}
