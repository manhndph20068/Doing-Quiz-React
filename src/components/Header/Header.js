import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Manhhh
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              User
            </NavLink>
            <NavLink className="nav-link" to="/admins">
              Admin
            </NavLink>

            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">User</Nav.Link>
            <Nav.Link href="#link">Admin</Nav.Link> */}
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                {" "}
                <button className="btn-login" onClick={() => handleLogin()}>
                  Login
                </button>
                <button className="btn-signup" onClick={() => handleRegister()}>
                  Signup
                </button>{" "}
              </>
            ) : (
              <>
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
