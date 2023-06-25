import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { supabase } from "./supabase";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


//import { DensitySmallIcon } from '@mui/icons-material/DensitySmallIcon';
//import { ClearIcon } from '@mui/icons-material/Clear';

function getStoredName() {
  return window.localStorage.getItem("name") ?? "";
}

function setStoredName(newName) {
  window.localStorage.setItem("name", newName);
}

export default function Navbar() {
  const [state, setState] = useState(false);

  const [check, setCheck] = useState(false);

  const [name, setName] = useState(getStoredName());

  const hasName = name.length > 0;

  const handleNameChangeClick = () => {
    const newName = prompt("What's your name?");
    if (newName.length === 0) {
      setName("");
    } else {
      setName(newName);
      setStoredName(newName);
    }
  };

  const handleLogOutClick = () => {
    supabase.auth.signOut();
  };

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, check) => {
      setCheck(!check);
    });
    return () => check;
  }, []);

  return (
    <nav className="navbarItems">
      <h1 className="navbar-left">
        <img
          className="navbar-logo"
          src={require("../images/logo.png")}
          alt="logo"
        ></img>
      </h1>

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
      <div className="account">
        {check ? <>
          <a href="/features"><Button>Guest</Button></a>
          <a href="/login"><Button>Login</Button></a>
          <a href="/login"><Button>Sign Up</Button></a>
        </> :
          <>
            {hasName && <Typography>Welcome back, {name}!</Typography>}
            <IconButton sx={{ color: "blue" }} onClick={handleNameChangeClick}>
              <AccountCircleIcon />
            </IconButton>
            <Button
              variant="text"
              sx={{ color: "blue" }}
              onClick={handleLogOutClick}
            >Log out</Button>
          </>}
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className="menu-icons" onClick={() => setState(!state)}>
        <i className={state ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
    </nav>
  );
}
