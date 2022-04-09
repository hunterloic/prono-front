import { backend } from "../config/points";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

export const useAxios = () => {
  const { keycloak } = useKeycloak();

  axios.defaults.baseURL = backend.rootUrl;
  axios.defaults.headers.common = {
    Authorization: `Bearer ${keycloak.token}`,
  };
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return { axios };
};

//   axios.defaults.baseURL = backend.rootUrl;
//   axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
//   axios.defaults.headers.post["Content-Type"] = "application/json";
