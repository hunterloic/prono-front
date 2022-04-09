import { Navigate } from "react-router-dom";
import { useAuthorized } from "../hooks/useAuthorized";

const SecuredRoute = ({ roles, children }) => {
  const { isAuthorized } = useAuthorized(roles);
  return isAuthorized ? children : <Navigate to="/" />;
};

export default SecuredRoute;
