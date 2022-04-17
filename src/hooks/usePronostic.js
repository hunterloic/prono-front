import React, { createContext, useReducer, useContext } from "react";
import pronosticsReducer from "../reducers/pronosticsReducer";

const PronosticContext = createContext();

const usePronostics = () => useContext(PronosticContext);

const PronosticsProvider = ({ pronostics = [], children }) => {
  const [currentPronostics, dispatchPronostics] = useReducer(
    pronosticsReducer,
    pronostics
  );
  return (
    <PronosticContext.Provider
      value={{ currentPronostics, dispatchPronostics }}
    >
      {children}
    </PronosticContext.Provider>
  );
};

const withPronosticsProvider =
  (Component) =>
  ({ pronostics, ...props }) => {
    return (
      <PronosticsProvider pronostics={pronostics}>
        <Component {...props} />
      </PronosticsProvider>
    );
  };

export { PronosticsProvider, withPronosticsProvider, usePronostics };
