import { useState } from "react";
import { motion } from "framer-motion";
import PasswordChecklist from "react-password-checklist";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../App.css";
import logo from "../assets/undraw_fingerprint_re_uf3f.svg";
import NotAllowed from "./NotAllowed";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ChangePassword({user,email}) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validation, setValidation] = useState(false);
  const handleSubmit = async () => {
    const response = await axios.patch(`${REACT_APP_ENV_VAR}/user`, {email: email, password: newPassword});
    if(response.status ===200){
      navigate("/");
    }
    else{
      alert("Could not change password!");
    }
  };
  return (
    <>
      {(user !== null) ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-container">
            <div className="flex-child">
              <p style={{ fontSize: "30px" }}>Change your password ✍️</p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    required
                    placeholder="Choose a strong one :)"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
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
                  value={newPassword}
                  valueAgain={confirmNewPassword}
                  onChange={(isValid) => {
                    setValidation(isValid);
                  }}
                />
                {validation ? (
                  <>
                    <div className="containerStyle">
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Change Password
                      </Button>{" "}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="containerStyle">
                      <Button variant="outline-secondary" disabled>
                        Change Password
                      </Button>{" "}
                    </div>
                  </>
                )}
              </Form>
            </div>
            <div className="flex-child">
              <Image
                src={logo}
                fluid
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </div>
          </div>
        </motion.div>
      ) : (
        <NotAllowed />
      )}
    </>
  );
}

export default ChangePassword;