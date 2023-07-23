import Hero from "../components/Hero.js";

function Learn() {
  return (
    <>
      <Hero
        name="hero"
        title="Learn"
        desc="A easy platform to analyse and create graphs"
        url="/"
        next="hide"
      />
      <video src={require("../images/5716.mp4")} width="750" height="500" alignSelf= "center" controls>
     </video>
    </>
  );
}

export default Learn;
