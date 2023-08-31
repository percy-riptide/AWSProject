import NavBar from "./Components/NavBar";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import Footer from "./Components/Footer";
import './App.css';
import { useState } from "react";

function App() {
  const [user, setUser] = useState(sessionStorage.getItem('user'));

  const handleLogin = (email) => {
    sessionStorage.setItem("user", email);
    sessionStorage.setItem("loginStatus",true);
    setUser(email);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.setItem("loginStatus",false);
    setUser(null);
  };
  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <div>
        <AnimatedRoutes user={user} onLogin={handleLogin} onLogout={handleLogout}/>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;