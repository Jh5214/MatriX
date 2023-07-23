
import Hero from "../components/Hero.js";
import GraphSlider from "../components/GraphsSlider";
import Instru from "../components/Instru";
//import { ListItemButton, ListItemText } from "@mui/material";
import "../images/bg.png";

function Home() {
  return (
    <>
      <Hero
        name="hero"
        heroImg = "../images/bg.png"
        title="Business Analytics"
        desc="A easy platform to analyse and create graphs"
        url="/features"
        btnClass = "show"
        buttontext = "Get Started"
      />
      <div className="bg-blue">
        <GraphSlider />
      </div>
        <Instru/>
      <div>
      </div>
    </>
  );
}

export default Home;
