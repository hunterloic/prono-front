import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "prono",
  clientId: "prono-front",
});

export default keycloak;
