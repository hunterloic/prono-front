import { useKeycloak } from "@react-keycloak/web";
import { Container } from "react-bootstrap";

export default function Home() {
  const { keycloak } = useKeycloak();

  const realm = keycloak.hasRealmRole("admin");
  const resource = keycloak.hasResourceRole("admin");

  console.log(realm);
  console.log(resource);

  return (
    <Container>
      <h2>Home</h2>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
      <div>test test</div>
    </Container>
  );
}
