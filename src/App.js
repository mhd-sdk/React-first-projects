import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./Styles/Style.css";
import Home from "./pages/Home";
import Navbar from "./components/NavBar/Navbar";
import Project1 from "./pages/Project1";
import Project2 from "./pages/Project2";
import Project3 from "./pages/Project3";
import { AnimatePresence } from "framer-motion";
import "rsuite/styles/index.less";
const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/project1" element={<Project1 />} />
            <Route path="/project2" element={<Project2 />} />
            <Route path="/project3" element={<Project3 />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
