import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { withGamesProvider } from "./hooks/useGames";
import { loadGames } from "./api/pronostic";

const contextValue = {
  games: loadGames(),
};

const AppWithContext = withGamesProvider(App);

// Create a root.
ReactDOMClient.createRoot(document.getElementById("root")).render(
  <AppWithContext {...contextValue} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
