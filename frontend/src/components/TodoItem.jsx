import React from 'react';
import { ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText
        primary={todo.text}
        sx={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'text.disabled' : 'text.primary',
          cursor: 'pointer',
        }}
        onClick={() => toggleComplete(todo.id)}
      />
    </ListItem>
  );
};

export default TodoItem;
