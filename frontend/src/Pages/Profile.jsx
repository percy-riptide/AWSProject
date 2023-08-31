import { useState } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import logo from "../assets/undraw_fashion_photoshoot_mtq8.svg";
import { useNavigate } from "react-router-dom";
import NotAllowed from "./NotAllowed";
import axios from 'axios';

function Profile({ user, onLogout, email }) {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState(user);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleSaveClick = async () => {
    const response = await axios.patch(`${REACT_APP_ENV_VAR}/user`,{email:email, username:username});
    if(response.status === 200) {
      setIsEditMode(false);
    }else{
      alert("could not save changes");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {user !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-container">
            <div className="flex-child">
              <h2>Edit Profile 💅</h2>
              <br />
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    disabled={!isEditMode}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={Email}
                    onChange={handleEmailChange}
                    disabled={true}
                  />
                </Form.Group>
                <br />
                {isEditMode ? (
                  <div className="containerStyle">
                    <Button variant="outline-success" onClick={handleSaveClick}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="containerStyle">
                      <Button
                        variant="outline-primary"
                        onClick={handleEditClick}
                      >
                        Edit Personal Details
                      </Button>
                    </div>
                    <br />
                    <div className="containerStyle">
                      <Button
                        variant="outline-warning"
                        onClick={() => {
                          navigate("/changepass");
                        }}
                      >
                        Change Password
                      </Button>
                    </div>
                    <br></br>
                    <div className="containerStyle">
                      <Button
                        variant="outline-danger"
                        onClick={handleShowModal}
                      >
                        Delete Account
                      </Button>
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This will permanently delete all the data that is related to you
            from the application, please be cautious before performing this
            action!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Cancel
          </Button>{" "}
          <Button
            variant="outline-danger"
            onClick={ async () => {
              const response = await axios.delete(`${REACT_APP_ENV_VAR}/user`,{email: email});
              if(response.status===200){
                handleCloseModal();
                onLogout();
                navigate("/");
              }else {
                alert("could not delete account please try again!");
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
