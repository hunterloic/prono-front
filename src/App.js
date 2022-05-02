import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { useGames } from "./hooks/useGames";
import { useAxios } from "./hooks/useAxios";
import { usePronostics } from "./hooks/usePronostic";
import Routes from "./Routes";

function App() {
  const { axios } = useAxios();
  const { initialized } = useKeycloak();
  const { dispatchGames } = useGames();
  const { dispatchPronostics } = usePronostics();

  // todo try to move fetch in index js ?
  useEffect(() => {
    async function fetchGames() {
      dispatchGames({
        type: "INIT_GAMES",
        payload: {
          games: (await axios.get("/game")).data,
        },
      });
    }

    async function fetchPronostics() {
      dispatchPronostics({
        type: "INIT_PRONOSTICS",
        payload: {
          pronostics: (await axios.get("/pronostic")).data,
        },
      });
    }

    if (initialized) {
      fetchGames();
      fetchPronostics();
    }
  }, [initialized]);

  return !initialized ? (
    "LOADING"
  ) : (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
