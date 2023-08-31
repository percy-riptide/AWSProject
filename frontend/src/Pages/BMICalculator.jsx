import { motion } from "framer-motion";
import Image from "react-bootstrap/Image";
import logo from "../assets/undraw_stepping_up_g6oo.svg";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';

function BMICalculator({user, email}) {
  axios.post(`${REACT_APP_ENV_VAR}/bmi`, { email: email })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    if (activeButton === 2) {
      const heightValue = parseFloat(heightCm) / 100;
      const bmi = weightValue / (heightValue * heightValue);
      setBmi(bmi.toFixed(2));
    }
    if (activeButton === 1) {
      const heightValue =
        parseFloat(heightFeet) * 12 + parseFloat(heightInches);
      const bmi = (weightValue / (heightValue * heightValue)) * 703;
      setBmi(bmi.toFixed(2));
    }
  };

  const [activeButton, setActiveButton] = useState(1);
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [bmi, setBmi] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
          {" "}
          <h2>Know your current BMI ⚖️</h2>
          <br />
          <div style={{ display: "flex" }}>
            <ToggleButtonGroup type="radio" name="options" value={activeButton}>
              <ToggleButton
                id="tbg-radio-1"
                variant="outline-primary"
                value={1}
                onChange={() => {
                  setActiveButton(1);
                  setHeightCm("");
                  setWeight("");
                  setBmi(0);
                }}
              >
                Standard
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                variant="outline-primary"
                value={2}
                onChange={() => {
                  setActiveButton(2);
                  setHeightFeet("");
                  setHeightInches("");
                  setWeight("");
                  setBmi(0);
                }}
              >
                Metric
              </ToggleButton>
            </ToggleButtonGroup>
            {user && bmi > 0 && (
              <Button
                variant="outline-success"
                style={{ marginLeft: "15px" }}
                onClick={() => {
                  axios.put(`${REACT_APP_ENV_VAR}/bmi`, { email: email, bmi: bmi })
                  .then(response => {
                    if(response.status===200){
                      alert("Current BMI Saved");
                    }else{
                      alert("BMI not saved!")
                    }
                  })
                  .catch(error => {
                    console.error(error);
                  });
                }}
              >
                Save current BMI
              </Button>
            )}
          </div>
          <br />
          {activeButton === 1 && (
            <>
              <Form>
                <Form.Group>
                  <Form.Label>Height</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      onKeyPress={(event) => {
                        if (!/^[0-9]\d*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <InputGroup.Text>ft</InputGroup.Text>
                    <FormControl
                      type="number"
                      style={{ marginLeft: "10px" }}
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      onKeyPress={(event) => {
                        if (!/^[0-9]\d*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <InputGroup.Text>in</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <br />
                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="number"
                      value={weight}
                      step="0.1"
                      onChange={(e) => setWeight(e.target.value)}
                      onKeyPress={(event) => {
                        if (!/^\d*\.?\d*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <InputGroup.Text>lbs</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <br />
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    calculateBMI();
                  }}
                >
                  Calculate BMI
                </Button>
                {"  "}
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setHeightFeet("");
                    setHeightInches("");
                    setWeight("");
                    setBmi(0);
                  }}
                >
                  Clear Fields
                </Button>
              </Form>
            </>
          )}
          {activeButton === 2 && (
            <>
              <Form>
                <Form.Group>
                  <Form.Label>Height</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="number"
                      value={heightCm}
                      step="0.1"
                      onChange={(e) => setHeightCm(e.target.value)}
                      onKeyPress={(event) => {
                        if (!/^\d*\.?\d*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <InputGroup.Text>cm</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <br />
                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="number"
                      value={weight}
                      step="0.1"
                      onChange={(e) => setWeight(e.target.value)}
                      onKeyPress={(event) => {
                        if (!/^\d*\.?\d*$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <InputGroup.Text>kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <br />
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    calculateBMI();
                  }}
                >
                  Calculate BMI
                </Button>
                {"  "}
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setHeightCm("");
                    setWeight("");
                    setBmi(0);
                  }}
                >
                  Clear Fields
                </Button>
              </Form>
            </>
          )}
          <br />
          {bmi > 0 && bmi < 18.5 && (
            <>
              <Alert variant="warning">
                Your BMI is {bmi}. You are under weight!
              </Alert>
            </>
          )}
          {bmi >= 18.5 && bmi < 25 && (
            <>
              <Alert variant="success">
                Your BMI is {bmi}. You are normal weight!
              </Alert>
            </>
          )}
          {bmi >= 25 && bmi < 30 && (
            <>
              <Alert variant="warning">
                Your BMI is {bmi}. You are over weight!
              </Alert>
            </>
          )}
          {bmi > 30 && (
            <>
              <Alert variant="danger">Your BMI is {bmi}. You are obese!</Alert>
            </>
          )}
          {user !== null && <h2>Your Previous BMI was: {bmi}</h2>}
        </div>
        <div className="flex-child">
          <Image src={logo} fluid></Image>
        </div>
      </div>
    </motion.div>
  );
}

export default BMICalculator;
