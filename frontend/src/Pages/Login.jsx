import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import "../App.css";
import logo from "../assets/undraw_authentication_re_svpt.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Login({ onLogin, user }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailFound, setEmailFound] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${REACT_APP_ENV_VAR}/user`, { email: email });
    if (password === response.password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    if(response.status!==200){
      setEmailFound(false);
    }
    else{
      setEmailFound(true);
    }
    if(passwordMatch && emailFound){
      onLogin(response.email, response.username);
    }
    onLogin(email);
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        {user === null ? (
          <div className="flex-child">
            <p style={{ fontSize: "30px" }}>Welcome Back!😄</p>
            <Form
              onSubmit={(e) => {
                handleFormSubmit(e);
              }}
            >
              <Form.Group className="mb-3" controlId="emailID">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <br />
                {validateEmail(email) ? (
                  <>
                    <Alert variant="success">Email is in correct format</Alert>
                  </>
                ) : (
                  <>
                    <Alert variant="warning">
                      Email is not in correct format
                    </Alert>
                  </>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  required
                  placeholder="Enter Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  {" "}
                  <Button variant="outline-primary" type="submit">
                    Login
                  </Button>{" "}
                </span>
                {/* {!passwordMatch && <Alert variant="warning">Password incorrect</Alert>}
                {!emailFound && <Alert variant="danger">Account not found! Please Register</Alert>} */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ paddingTop: "20px" }}>
                  No Account? <Link to="/signup">Register</Link>
                </p>
              </div>
            </Form>
          </div>
        ) : (
          <div className="flex-child">
            <p style={{ fontSize: "30px" }}>You are already logged on!😄</p>
            <div>
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home Page
              </Button>{" "}
              <Button
                variant="outline-success"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </Button>
            </div>
          </div>
        )}
        <div className="flex-child">
          <Image src={logo} fluid></Image>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
