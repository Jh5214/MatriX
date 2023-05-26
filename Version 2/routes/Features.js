import Hero from "../components/Hero.js";
import "../images/logo.png";
//import GraphSlider from "../components/GraphsSlider";

function Features() {
  return (
    <>
      <Hero
        name="hero"
        heroImg = "../images/logo.png"
        title="Features"
        desc="A easy platform to analyse and create graphs"
        url="/"
        next="hide"
      />
    </>
  );
}

export default Features;
