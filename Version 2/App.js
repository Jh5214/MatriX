import "./styles.css";
import Navbar from "./components/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Features from "./routes/Features";
import Graphs from "./routes/Graphs";
import Learn from "./routes/Learn";
import Templates from "./routes/Templates";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import Screen from "./routes/Screen";

export default function App() {

  return (
    <div>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/graphs" element={<Graphs />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Screen />} />
      </Routes>
      <Navbar />
      <Footer/>
    </div>
    </div>
  );
}
