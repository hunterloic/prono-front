import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pronostics from "./pages/Pronostics";
import NoPage from "./pages/NoPage";
import Results from "./pages/Results";
import { withSearchCountryProvider } from "./hooks/useSearchCountry";
import LoggedInRoute from "./components/LoggedInRoute";
import SecuredRoute from "./components/SecuredRoute";
import ManageTeams from "./pages/ManageTeams";
import ManageGames from "./pages/ManageGames";
import ManageGroups from "./pages/ManageGroups";
import { useKeycloak } from "@react-keycloak/web";
import ManageCategories from "./pages/ManageCategories";

function App() {
  const { initialized } = useKeycloak();
  const PronosticWithContext = withSearchCountryProvider(Pronostics);
  const ResultsWithContext = withSearchCountryProvider(Results);

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
                <PronosticWithContext />
              </LoggedInRoute>
            }
          />
          <Route
            path="results"
            element={
              <LoggedInRoute>
                <ResultsWithContext />
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
