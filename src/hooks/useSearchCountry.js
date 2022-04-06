import React, { createContext, useContext, useState } from "react";
import { Form, FormControl } from "react-bootstrap";

const SearchCountryContext = createContext();

const useSearchCountry = () => useContext(SearchCountryContext);

const SearchCountryProvider = ({ initialValue = "", children }) => {
  const [searchCountry, setSearchCountry] = useState(initialValue);
  return (
    <SearchCountryContext.Provider value={{ searchCountry, setSearchCountry }}>
      {children}
    </SearchCountryContext.Provider>
  );
};

const withSearchCountryProvider =
  (Component) =>
  ({ searchCountry, ...props }) => {
    return (
      <SearchCountryProvider searchCountry={searchCountry}>
        <Component {...props} />
      </SearchCountryProvider>
    );
  };

const SearchCountryInput = ({ ...props }) => {
  const { searchCountry, setSearchCountry } = useSearchCountry();
  return (
    <FormControl
      type="search"
      placeholder="Search"
      onChange={(e) => setSearchCountry(e.target.value)}
      value={searchCountry}
      {...props}
    />
  );
};

export {
  SearchCountryProvider,
  withSearchCountryProvider,
  useSearchCountry,
  SearchCountryInput,
};
