import "./Hero.css";
import { Button } from "@mui/material";

function Hero(props) {
  return (
    <>
      <div className={props.name}>
        <img alt="background" src={props.heroImg} />
        <div className="hero-text">
          <h1>{props.title}</h1>

          <p>{props.desc}</p>
          <Button variant="contained" href="./features">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}

export default Hero;