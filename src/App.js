import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pronostics from "./pages/Pronostics";
import NoPage from "./pages/NoPage";
import Results from "./pages/Results";
import { withSearchCountryProvider } from "./hooks/useSearchCountry";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const PronosticWithContext = withSearchCountryProvider(Pronostics);
  const ResultsWithContext = withSearchCountryProvider(Results);

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="pronostics"
              element={
                <PrivateRoute>
                  <PronosticWithContext />
                </PrivateRoute>
              }
            />
            <Route path="results" element={<ResultsWithContext />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
