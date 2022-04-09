import { useKeycloak } from "@react-keycloak/web";
import { Container } from "react-bootstrap";

export default function Home() {
  const { keycloak } = useKeycloak();

  console.log(keycloak.token);

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
