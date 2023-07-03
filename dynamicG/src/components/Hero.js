import "./Hero.css";
//import { Button } from "@mui/material";

function Hero(props) {
  return (
    <>
      <div className={props.name}>
        <img alt="background" src={require("../images/bg.png")} />
        <div className="hero-text">
          <h1>{props.title}</h1>

          <p>{props.desc}</p>
          <a href = {props.url} className = {props.btnClass} variant = "contained">
            {props.buttontext}
          </a>
        </div>
      </div>
    </>
  );
}

export default Hero;
