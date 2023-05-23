//import "./styles.css";
import Navbar from "../components/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Features from "./Features";
import Graphs from "./Graphs";
import Learn from "./Learn";
import Templates from "./Templates";

function Routess() {
  return (

  <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/graphs" element={<Graphs />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default Routes;