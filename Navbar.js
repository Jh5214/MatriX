import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";

export default function Navbar() {
  const [state, setState] = useState(false);

  return (
    <nav className="navbarItems">
      <h1 className="navbar-left">
        <img
          className="navbar-logo"
          src={require("../images/logo.png")}
          alt="logo"
        ></img>
      </h1>

      <div className="menu-icons" onClick={() => setState(!state)}>
        <i className={state ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={state ? "navbar-menu active" : "navbar-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.name} to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <ButtonGroup
        sx={{ position: "absolute", top: "100%", left: "0%" }}
        className="account"
        size="large"
        variant="text"
        aria-label="outlined primary button group"
      >
        <Button href="../login">Guest</Button>
        <Button href="../login">Login</Button>
        <Button href="../login">Sign Up</Button>
      </ButtonGroup>
    </nav>
  );
}
