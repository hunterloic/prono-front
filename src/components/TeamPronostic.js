import { Form, Stack } from "react-bootstrap";
import { getWinnerPronostic } from "../helper/game";
import { useGames } from "../hooks/useGames";
import { usePronostics } from "../hooks/usePronostic";
import CountryFlag from "./CountryFlag";

export default function TeamPronostic({ gameId, teamId, code, name, order }) {
  const { currentPronostics, dispatchPronostics } = usePronostics();

  const handlePronosticChange = (e) => {
    const pronostic = e.target.value;
    if (pronostic.length > 2) {
      return;
    }

    dispatchPronostics({
      type: "SET_PRONOSTIC",
      payload: {
        gameId,
        teamId,
        pronostic: parseInt(pronostic),
      },
    });
  };

  const flagOrder = order === 0 ? 1 : 3;
  const nameOrder = 2;
  const guessOrder = order === 0 ? 3 : 1;

  const getPronostic = () => {
    return (
      currentPronostics.filter(
        (prono) => prono.gameId === gameId && prono.teamId === teamId
      )[0]?.pronostic || ""
    );
  };

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
        value={getPronostic()}
        onChange={handlePronosticChange}
      />
    </Stack>
  );
}
