import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

function Layout() {
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/pronostics"}>
                My Pronostics
              </Nav.Link>
              <Nav.Link as={Link} to={"/results"}>
                Results
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
