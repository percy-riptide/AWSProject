import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/reshot-icon-whey-protein-GTVDJWM2XF.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NavBar({ user, onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar collapseOnSelect expand="lg" sticky="top">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" className="ml-6">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            FitFolio
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto mr-16 space-x-9">
              {user === null ? (
                <Nav.Link as={Link} to="/login">
                  Sign In
                </Nav.Link>
              ) : (
                <>
                  {" "}
                  <Nav.Link
                    onClick={() => {
                      onLogout();
                    }}
                  >
                    Logout
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    {user}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </motion.div>
  );
}

export default NavBar;
