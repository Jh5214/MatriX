import TaskManager from "../TaskManager";
import Account from "../Account";

import { Container } from "@mui/material";
import { useEffect, useState } from "react";

import "../images/white.png"

function getStoredTasks() {
  const rawTasks = window.localStorage.getItem("tasks");
  if (rawTasks != null) {
    return JSON.parse(rawTasks);
  } else {
    return [];
  }
}

function setStoredTasks(newTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(newTasks));
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState(getStoredTasks());

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  return (
    <>
      
        <img src = {require("../images/white.png")}/>
   
    </>
  );}