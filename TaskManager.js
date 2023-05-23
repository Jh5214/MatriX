import TaskList from "./TaskList";
import EmptyState from "./EmptyState";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function TaskManager({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    setTasks([
      {
        task: newTask,
        completed: false
      },
      ...tasks
    ]);
    setNewTask("");
  };

  const handleTaskChange = (i) => {
    setTasks([
      ...tasks.slice(0, i),
      {
        task: tasks[i].task,
        completed: !tasks[i].completed
      },
      ...tasks.slice(i + 1)
    ]);
  };

  return (
    <Stack component="main" gap={2} marginTop={2}>
      <Typography variant="h4" component="h2">
        Add new task
      </Typography>
      <Stack component="form" direction="row" gap={1}>
        <TextField
          size="small"
          sx={{ flexGrow: 1 }}
          placeholder="What do you need to do today?"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          onClick={handleNewTaskSubmit}
        >
          Add
        </Button>
      </Stack>
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} onTaskChange={handleTaskChange} />
      ) : (
        <EmptyState />
      )}
    </Stack>
  );
}
