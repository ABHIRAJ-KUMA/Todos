import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StoreIcon from "@mui/icons-material/Store";
import EventIcon from "@mui/icons-material/Event";
import "./App.css";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [store, setStore] = useState("Store A");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
  };

  const addTodo = async () => {
    if (!task) return alert("Please enter a task");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, dueDate, store }),
      });
      if (res.ok) {
        const newTodo = await res.json();
        setTodos((prev) => [...prev, newTodo]);
        setTask("");
        setDueDate("");
      }
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? updated : todo))
        );
      }
    } catch (err) {
      console.error("Failed to update todo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  const groupedTodos = todos.reduce((groups, todo) => {
    (groups[todo.store] = groups[todo.store] || []).push(todo);
    return groups;
  }, {});

  return (
    <Container maxWidth="md" className="mt-4">
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Todo App
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
            sx={{ flexGrow: 1 }}
          />

          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Store</InputLabel>
            <Select
              value={store}
              label="Store"
              onChange={(e) => setStore(e.target.value)}
            >
              <MenuItem value="Store A">Store A</MenuItem>
              <MenuItem value="Store B">Store B</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={addTodo}
            startIcon={<AddIcon />}
            size="large"
          >
            Add
          </Button>
        </Box>
      </Paper>

      {Object.keys(groupedTodos).length === 0 && (
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          sx={{ my: 4 }}
        >
          No todos yet!
        </Typography>
      )}

      {Object.entries(groupedTodos).map(([storeName, todos]) => (
        <Paper key={storeName} elevation={2} sx={{ mb: 4, p: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <StoreIcon sx={{ mr: 1 }} />
            <Typography variant="h5" component="h2">
              {storeName}
            </Typography>
            <Chip label={`${todos.length} tasks`} size="small" sx={{ ml: 2 }} />
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List>
            {todos.map(({ _id, title, completed, dueDate }) => (
              <ListItem
                key={_id}
                sx={{
                  bgcolor: completed ? "action.selected" : "background.paper",
                  mb: 1,
                  textDecoration: completed ? "line-through" : "none",
                }}
              >
                <Checkbox
                  checked={completed}
                  onChange={() => toggleComplete(_id, completed)}
                />

                <ListItemText
                  primary={title || "[No Title]"}
                  secondary={
                    dueDate && (
                      <Box display="flex" alignItems="center" mt={0.5}>
                        <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <span>
                          Due: {new Date(dueDate).toLocaleDateString()}
                        </span>
                      </Box>
                    )
                  }
                />

                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => deleteTodo(_id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Container>
  );
}

export default App;
