import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pronostics from "./pages/Pronostics";
import NoPage from "./pages/NoPage";
import Results from "./pages/Results";
import { withSearchCountryProvider } from "./hooks/useSearchCountry";

function App() {
  const PronosticWithContext = withSearchCountryProvider(Pronostics);
  const ResultsWithContext = withSearchCountryProvider(Results);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pronostics" element={<PronosticWithContext />} />
          <Route path="results" element={<ResultsWithContext />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
