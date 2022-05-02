import { Routes as ReactDOMRoutes, Route } from "react-router-dom";
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
import { SearchCountryProvider } from "./hooks/useSearchCountry";
import Ladder from "./pages/Ladder";
import { useQuery } from "./hooks/useQuery";

export default function Routes() {
  const query = useQuery();
  return (
    <ReactDOMRoutes>
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
                <Results userName={query.get("userName")} />
              </SearchCountryProvider>
            </LoggedInRoute>
          }
        />
        <Route
          path="ladder"
          element={
            <LoggedInRoute>
              <Ladder />
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
    </ReactDOMRoutes>
  );
}
