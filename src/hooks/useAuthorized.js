import { useKeycloak } from "@react-keycloak/web";

export const useAuthorized = (roles) => {
  const { keycloak } = useKeycloak();
  return {
    isAuthorized:
      roles &&
      keycloak.authenticated &&
      roles.some((r) => keycloak.hasResourceRole(r)),
  };
};
