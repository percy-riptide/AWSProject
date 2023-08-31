import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ChangePassword from "../Pages/ChangePassword";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import BMICalculator from "../Pages/BMICalculator";

function AnimatedRoutes({ user, onLogin, onLogout, email }) {
    const location = useLocation();
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<BMICalculator user={user} onLogout={onLogout} email={email}/>} />
      <Route path="/login" element={<Login onLogin={onLogin} user={user}/>} />
      <Route path="/signup" element={<Register user={user} onLogout={onLogout}/>} />
      <Route path="/changepass" element={<ChangePassword user={user} email={email}/>} />
      <Route path="/profile" element={<Profile user={user} onLogout={onLogout} email={email}/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AnimatePresence>
  )
}

export default AnimatedRoutes;