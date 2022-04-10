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
    const pronostic = e.target.value;
    if (pronostic.length > 2) {
      return;
    }
    dispatchGames({
      type: "SET_PRONOSTIC",
      payload: {
        gameId: gameId,
        teamId: teamId,
        pronostic: parseInt(pronostic),
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
        type="number"
        min="0"
        className={`p-1 order-${guessOrder}`}
        style={{ width: "3em" }}
        value={pronostic || ""}
        onChange={handlePronosticChange}
      />
    </Stack>
  );
}
