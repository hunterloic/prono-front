import { useKeycloak } from "@react-keycloak/web";

export const useLoggedIn = () => {
  const { keycloak } = useKeycloak();
  return { isLoggedIn: keycloak.authenticated };
};
