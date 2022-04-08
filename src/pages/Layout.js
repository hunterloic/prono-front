import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function Layout() {
  const { keycloak, initialized } = useKeycloak();
  return (
    <>
      <Navbar
        collapseOnSelect
        bg="dark"
        variant="dark"
        expand="md"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#home">Prono</Navbar.Brand>

          {!keycloak.authenticated && (
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => keycloak.login()}
            >
              Login
            </Button>
          )}
          {!keycloak.authenticated && (
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => keycloak.register()}
            >
              Register
            </Button>
          )}
          {keycloak.authenticated && (
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => keycloak.logout()}
            >
              Logout ({keycloak.tokenParsed.preferred_username})
            </Button>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              {keycloak.authenticated && (
                <>
                  <Nav.Link as={Link} to={"/pronostics"}>
                    My Pronostics
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/results"}>
                    Results
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
