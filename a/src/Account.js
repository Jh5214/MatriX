import { useState } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { supabase } from "./supabase";

function getStoredName() {
  return window.localStorage.getItem("name") ?? "";
}

function setStoredName(newName) {
  window.localStorage.setItem("name", newName);
}

export default function WelcomeBanner({ numOfTasks }) {
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

  return (
    <header>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Rocket To-dos
          </Typography>
          {hasName && <Typography>Welcome back, {name}!</Typography>}
          <IconButton sx={{ color: "white" }} onClick={handleNameChangeClick}>
            <ChangeCircleIcon />
          </IconButton>
          <Button
            variant="text"
            sx={{ color: "white" }}
            onClick={handleLogOutClick}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
}