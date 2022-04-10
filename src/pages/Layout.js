import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useLoggedIn } from "../hooks/useLoggedIn";
import { useAuthorized } from "../hooks/useAuthorized";

function Layout() {
  const { keycloak } = useKeycloak();
  const { isLoggedIn } = useLoggedIn();
  const { isAuthorized: isAdmin } = useAuthorized(["admin"]);
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
          <Navbar.Brand href="/">Prono</Navbar.Brand>

          {!isLoggedIn && (
            <>
              <Button
                variant="secondary"
                className="mx-2"
                onClick={() => keycloak.login()}
              >
                Login
              </Button>
              <Button
                variant="secondary"
                className="mx-2"
                onClick={() => keycloak.register()}
              >
                Register
              </Button>
            </>
          )}
          {isLoggedIn && (
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
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to={"/pronostics"}>
                    My Pronostics
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/results"}>
                    Results
                  </Nav.Link>
                </>
              )}

              {isAdmin && (
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/manageteams">Teams</NavDropdown.Item>
                  <NavDropdown.Item href="/managecategories">
                    Categories
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/managegames">Games</NavDropdown.Item>
                  <NavDropdown.Item href="/managegroups">
                    Groups
                  </NavDropdown.Item>
                </NavDropdown>
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
