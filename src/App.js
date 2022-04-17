import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pronostics from "./pages/Pronostics";
import NoPage from "./pages/NoPage";
import Results from "./pages/Results";
import LoggedInRoute from "./components/LoggedInRoute";
import SecuredRoute from "./components/SecuredRoute";
import ManageTeams from "./pages/ManageTeams";
import ManageGames from "./pages/ManageGames";
import ManageGroups from "./pages/ManageGroups";
import ManageCategories from "./pages/ManageCategories";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { useGames } from "./hooks/useGames";
import { useAxios } from "./hooks/useAxios";
import { SearchCountryProvider } from "./hooks/useSearchCountry";

function App() {
  const { axios } = useAxios();
  const { initialized } = useKeycloak();
  const { dispatchGames } = useGames();

  useEffect(() => {
    async function fetchGames() {
      dispatchGames({
        type: "INIT_GAMES",
        payload: {
          games: (await axios.get("/game")).data,
        },
      });
    }

    if (initialized) fetchGames();
  }, [initialized]);

  return !initialized ? (
    "LOADING"
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="pronostics"
            element={
              <LoggedInRoute>
                <SearchCountryProvider>
                  <Pronostics />
                </SearchCountryProvider>
              </LoggedInRoute>
            }
          />
          <Route
            path="results"
            element={
              <LoggedInRoute>
                <SearchCountryProvider>
                  <Results />
                </SearchCountryProvider>
              </LoggedInRoute>
            }
          />
          <Route
            path="manageteams"
            element={
              <SecuredRoute roles={["admin"]}>
                <ManageTeams />
              </SecuredRoute>
            }
          />
          <Route
            path="managecategories"
            element={
              <SecuredRoute roles={["admin"]}>
                <ManageCategories />
              </SecuredRoute>
            }
          />
          <Route
            path="managegames"
            element={
              <SecuredRoute roles={["admin"]}>
                <ManageGames />
              </SecuredRoute>
            }
          />
          <Route
            path="managegroups"
            element={
              <SecuredRoute roles={["admin"]}>
                <ManageGroups />
              </SecuredRoute>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
