import { motion } from "framer-motion";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import logo from "../assets/undraw_warning_re_eoyh.svg";
import { useNavigate } from "react-router-dom";

function NotAllowed() {
    const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
         <h1>Woah! Woah! ✋</h1>
         <br/>
         <h2>Hold your horses there mate!</h2>
         <h2>This portion of the website is members only access</h2>
         <br/>
         <h2>Join in on the fun!</h2>
         <h2>Create an account or login into existing!</h2>
         <br/>
         <Button variant="outline-success" onClick={() => {navigate("/signup");}}>Register</Button>{" "}
        <Button variant="outline-primary" onClick={() => {navigate("/login");}}>Login</Button>
        </div>
        <div className="flex-child">
        <Image src={logo} fluid></Image>
        </div>
      </div>
    </motion.div>
  );
}

export default NotAllowed;