import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/undraw_balloons_re_8ymj.svg";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Register({ user, onLogout }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [validation, setValidation] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async () => {
    const response = await axios.put(`${REACT_APP_ENV_VAR}/user`, {email: email, password: password, username: firstName})
    if(response.status!==200){
      alert("Could not sign up! Please try again!");
    }
    else{
      navigate("/login");
    }
  };

  const handleLogOut = () => {
    onLogout();
    navigate("/signup");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        {user === null ? (
          <div className="flex-child" style={{ marginBottom: "20px" }}>
            <h5>
              We would love to have you onboard!🥳{"  "}
              <Link to="/login">Login Instead?</Link>
            </h5>

            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  placeholder="Choose Something Groovy B)"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Enter your email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  required
                  placeholder="Enter your email address (you won't be spammed!)"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
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
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  required
                  placeholder="Choose a strong one :)"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={confirmNewPassword}
                  placeholder="Don't forget it!"
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={confirmNewPassword}
                onChange={(isValid) => {
                  setValidation(isValid);
                }}
              />

              {validation && validateEmail(email) ? (
                <>
                  <div className="containerStyle">
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Sign up
                    </Button>{" "}
                  </div>
                </>
              ) : (
                <>
                  <p className="containerStyle">
                    Meet all the conditions to sign up!
                  </p>
                  <div className="containerStyle">
                    <Button variant="outline-secondary" disabled>
                      Sign up
                    </Button>{" "}
                  </div>
                </>
              )}
            </Form>
          </div>
        ) : (
          <div className="flex-child">
            <h1>Please log out to make a new account!</h1>
            <br />
            <div className="containerStyle">
              <Button
                variant="outline-warning"
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log out
              </Button>
            </div>
          </div>
        )}
        <div className="flex-child">
          <Image src={logo} fluid style={{ height: "90%" }}></Image>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;