import { Navigate } from "react-router-dom";
import { useLoggedIn } from "../hooks/useLoggedIn";

const LoggedInRoute = ({ children }) => {
  const { isLoggedIn } = useLoggedIn();
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default LoggedInRoute;
