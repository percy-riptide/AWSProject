import { motion } from "framer-motion";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import logo from "../assets/undraw_feeling_blue_-4-b7q.svg";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
         <h1>Did you go Astray? 😶‍🌫️</h1>
         <br/>
         <h2>The page you are trying to view does not exist</h2>
         <h2>Please check the URL and try again</h2>
         <br/>
         <h2>If nothing comes to your mind just head back to our home page</h2>
         <br/>
         <h2>Please use the below button to reach our home page</h2>
         <br/>
         <Button variant="outline-success" onClick={() => {navigate("/");}}>Home Page</Button>
        </div>
        <div className="flex-child">
        <Image src={logo} fluid></Image>
        </div>
      </div>
    </motion.div>
  );
}

export default NotFound;