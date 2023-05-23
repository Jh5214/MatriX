import Navbar from "../components/Navbar";
import Hero from "../components/Hero.js";
import GraphSlider from "../components/GraphsSlider";
import { ListItemButton, ListItemText } from "@mui/material";

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        name="hero"
        heroImg="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
        title="Business Analytics"
        desc="A easy platform to analyse and create graphs"
        url="/"
        next="show"
      />
      <div className="bg-blue">
        <GraphSlider />
      </div>
      <div>
        <h1 className="started"> To get Started</h1>
        <div></div>
      </div>
    </>
  );
}

export default Home;