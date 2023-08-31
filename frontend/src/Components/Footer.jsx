import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        background: "#ffffff",
        textAlign: "center",
        zIndex: 9999
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p style={{marginTop: "12px", background:"#ffffff"}}>Keep Track, Get Swole! - FitFolio™ 🫶</p>
    </motion.div>
  );
}

export default Footer;