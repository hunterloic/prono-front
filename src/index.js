import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { withGamesProvider } from "./hooks/useGames";
import { withPronosticsProvider } from "./hooks/usePronostic";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { flowRight } from "lodash";

const contextValue = {
  games: [],
  pronostics: [],
};

const AppWithContext = flowRight(
  withGamesProvider,
  withPronosticsProvider
)(App);

// Create a root.
ReactDOMClient.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <AppWithContext {...contextValue} />
  </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
