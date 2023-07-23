import { Checkbox, Card, CardContent, Typography, Stack } from "@mui/material";

export default function TaskList({ tasks, onTaskChange }) {
  const handleTaskChange = (i) => () => {
    onTaskChange(i);
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        Task list
      </Typography>
      <Stack>
        {tasks.map((task, i) => {
          return (
            <Card key={i} sx={{ marginBottom: 1 }}>
              <Stack direction="row" alignItems="center">
                <Checkbox
                  checked={task.completed}
                  onChange={handleTaskChange(i)}
                />
                <Typography>{task.task}</Typography>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </>
  );
}