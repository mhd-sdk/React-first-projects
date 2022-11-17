import React from "react";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, x: -10 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
